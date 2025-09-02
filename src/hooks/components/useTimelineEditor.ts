/**
 * 多样式编辑器业务逻辑 Hook
 */
import { useAutoSaveDialog } from '@/hooks/useAutoSaveDialog';
import type { TimelineItem } from '@/types/resume';
import { useState } from 'react';

interface TimelineEditorData {
  items: TimelineItem[];
  selectedIcon: string;
}

export const useTimelineEditor = (
  isOpen: boolean,
  initialData: TimelineItem[],
  currentIcon: string,
  onSave: (data: TimelineItem[], iconName?: string) => void,
  onClose: () => void
) => {
  const [isIconSelectorOpen, setIsIconSelectorOpen] = useState(false);

  // 使用通用的自动保存对话框 Hook
  const { data, setData, handleClose, saveStatusText } = useAutoSaveDialog<TimelineEditorData>({
    isOpen,
    initialData: { items: initialData, selectedIcon: currentIcon },
    onSave: (data) => onSave(data.items, data.selectedIcon),
    onClose,
    debounceDelay: 500,
  });

  const { items, selectedIcon } = data;

  // 设置项目列表
  const setItems = (newItems: TimelineItem[]) => {
    setData({ ...data, items: newItems });
  };

  // 设置选中图标
  const setSelectedIcon = (newIcon: string) => {
    setData({ ...data, selectedIcon: newIcon });
  };

  // 添加新项目
  const addItem = () => {
    const newItem: TimelineItem = {
      id: Date.now().toString(),
      title: '',
      subtitle: '',
      secondarySubtitle: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    setItems([...items, newItem]);
  };

  // 删除项目
  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // 更新项目字段
  const updateItem = (id: string, field: keyof TimelineItem, value: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  // 切换图标选择器
  const toggleIconSelector = () => {
    setIsIconSelectorOpen(!isIconSelectorOpen);
  };

  return {
    // 状态
    items,
    selectedIcon,
    isIconSelectorOpen,
    saveStatusText,

    // 操作方法
    addItem,
    removeItem,
    updateItem,
    setSelectedIcon,
    toggleIconSelector,
    handleClose,
  };
};
