/**
 * 全局错误处理 Hook
 * 提供便捷的方法来显示各种类型的错误消息
 */
import { addErrorMessageAtom, removeErrorMessageAtom, type ErrorMessage } from '@/store/errorStore';
import { useSetAtom } from 'jotai';
import { useCallback } from 'react';

export const useErrorHandler = () => {
  const addErrorMessage = useSetAtom(addErrorMessageAtom);
  const removeErrorMessage = useSetAtom(removeErrorMessageAtom);

  // 显示错误消息
  const showError = useCallback(
    (message: string, duration?: number) => {
      const messageId = addErrorMessage({
        message,
        type: 'error',
        duration: duration ?? 5000, // 默认5秒自动消失
      });

      // 处理自动消失
      if (duration !== 0) {
        setTimeout(() => {
          removeErrorMessage(messageId);
        }, duration ?? 5000);
      }
    },
    [addErrorMessage, removeErrorMessage]
  );

  // 显示警告消息
  const showWarning = useCallback(
    (message: string, duration?: number) => {
      const messageId = addErrorMessage({
        message,
        type: 'warning',
        duration: duration ?? 4000, // 默认4秒自动消失
      });

      // 处理自动消失
      if (duration !== 0) {
        setTimeout(() => {
          removeErrorMessage(messageId);
        }, duration ?? 4000);
      }
    },
    [addErrorMessage, removeErrorMessage]
  );

  // 显示信息消息
  const showInfo = useCallback(
    (message: string, duration?: number) => {
      const messageId = addErrorMessage({
        message,
        type: 'info',
        duration: duration ?? 3000, // 默认3秒自动消失
      });

      // 处理自动消失
      if (duration !== 0) {
        setTimeout(() => {
          removeErrorMessage(messageId);
        }, duration ?? 3000);
      }
    },
    [addErrorMessage, removeErrorMessage]
  );

  // 显示成功消息
  const showSuccess = useCallback(
    (message: string, duration?: number) => {
      const messageId = addErrorMessage({
        message,
        type: 'success',
        duration: duration ?? 3000,
      });

      // 处理自动消失
      if (duration !== 0) {
        setTimeout(() => {
          removeErrorMessage(messageId);
        }, duration ?? 3000);
      }
    },
    [addErrorMessage, removeErrorMessage]
  );

  // 通用的添加消息方法
  const addMessage = useCallback(
    (messageData: Omit<ErrorMessage, 'id'>) => {
      const messageId = addErrorMessage(messageData);

      // 处理自动消失
      if (messageData.duration && messageData.duration > 0) {
        setTimeout(() => {
          removeErrorMessage(messageId);
        }, messageData.duration);
      }

      return messageId;
    },
    [addErrorMessage, removeErrorMessage]
  );

  // 处理异步操作错误的便捷方法
  const handleAsyncError = useCallback(
    (error: unknown, defaultMessage = '操作失败，请重试') => {
      const message = error instanceof Error ? error.message : defaultMessage;
      showError(message);
      console.error('Async operation error:', error);
    },
    [showError]
  );

  return {
    showError,
    showWarning,
    showInfo,
    showSuccess,
    addMessage,
    handleAsyncError,
  };
};
