import { useDebounceCallback } from '@/hooks/useDebounce';
import { useCallback, useEffect, useRef, useState } from 'react';

interface UseAutoSaveDialogOptions<T> {
  /**
   * 对话框是否打开
   */
  isOpen: boolean;

  /**
   * 初始数据
   */
  initialData: T;

  /**
   * 保存回调函数
   */
  onSave: (data: T) => void;

  /**
   * 关闭回调函数
   */
  onClose: () => void;

  /**
   * 防抖延迟时间（毫秒），默认 500ms
   */
  debounceDelay?: number;

  /**
   * 数据比较函数，用于判断数据是否发生变化
   * 默认使用 JSON.stringify 进行比较
   */
  isEqual?: (a: T, b: T) => boolean;
}

/**
 * 自动保存对话框 Hook
 * 统一处理对话框的自动保存逻辑，解决关闭时数据丢失问题
 */
export const useAutoSaveDialog = <T>({
  isOpen,
  initialData,
  onSave,
  onClose,
  debounceDelay = 500,
  isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b),
}: UseAutoSaveDialogOptions<T>) => {
  const [data, setData] = useState<T>(initialData);
  const [isSaving, setIsSaving] = useState(false);

  const isInitialized = useRef(false);
  const latestDataRef = useRef(data);
  const lastSavedDataRef = useRef(initialData);

  // 更新最新数据的引用
  useEffect(() => {
    latestDataRef.current = data;
  }, [data]);

  // 自动保存回调
  const debouncedSave = useDebounceCallback((saveData: T) => {
    setIsSaving(true);
    try {
      onSave(saveData);
      lastSavedDataRef.current = saveData;
    } finally {
      // 短暂显示保存状态后隐藏
      setTimeout(() => setIsSaving(false), 300);
    }
  }, debounceDelay);

  // 当数据发生变化时自动保存
  useEffect(() => {
    // 只有在已初始化、对话框打开、且数据真的变化时才保存
    if (isInitialized.current && isOpen) {
      const hasChanged = !isEqual(data, lastSavedDataRef.current);
      if (hasChanged) {
        debouncedSave(data);
      }
    }
  }, [data, isOpen, debouncedSave, isEqual]);

  // 对话框状态变化处理
  useEffect(() => {
    if (isOpen) {
      if (!isInitialized.current) {
        // 首次打开：初始化数据
        setData(initialData);
        lastSavedDataRef.current = initialData;
        setIsSaving(false);
        isInitialized.current = true;
      }
    } else {
      // 关闭时重置状态
      isInitialized.current = false;
      setIsSaving(false);
    }
  }, [isOpen, initialData]);

  // 处理关闭前的强制保存
  const handleClose = useCallback(() => {
    if (isInitialized.current) {
      const currentData = latestDataRef.current;
      const hasUnsavedChanges = !isEqual(currentData, lastSavedDataRef.current);

      if (hasUnsavedChanges) {
        try {
          // 立即执行待执行的保存
          debouncedSave.flush();
        } catch (error) {
          console.warn('Debounce flush failed, saving directly:', error);
        }
        // 确保最新数据被保存
        onSave(currentData);
      }
    }
    onClose();
  }, [debouncedSave, onSave, onClose, isEqual]);

  return {
    /**
     * 当前数据
     */
    data,

    /**
     * 更新数据的函数
     */
    setData,

    /**
     * 是否正在保存
     */
    isSaving,

    /**
     * 安全的关闭处理函数（会在关闭前保存数据）
     */
    handleClose,

    /**
     * 保存状态文本
     */
    saveStatusText: isSaving ? '保存中...' : '自动保存',
  };
};
