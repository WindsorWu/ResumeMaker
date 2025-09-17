/**
 * 全局错误提示状态管理
 */
import { atom } from 'jotai';

export interface ErrorMessage {
  id: string;
  message: string;
  type: 'error' | 'warning' | 'info' | 'success';
  duration?: number; // 自动消失时间（毫秒），不设置则不自动消失
}

// 错误消息列表
export const errorMessagesAtom = atom<ErrorMessage[]>([]);

// 添加错误消息的 atom
export const addErrorMessageAtom = atom(
  null,
  (get, set, errorMessage: Omit<ErrorMessage, 'id'>) => {
    const currentMessages = get(errorMessagesAtom);
    const newMessage: ErrorMessage = {
      ...errorMessage,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };

    set(errorMessagesAtom, [...currentMessages, newMessage]);

    return newMessage.id;
  }
);

// 移除错误消息的 atom
export const removeErrorMessageAtom = atom(null, (get, set, messageId: string) => {
  const currentMessages = get(errorMessagesAtom);
  set(
    errorMessagesAtom,
    currentMessages.filter((msg) => msg.id !== messageId)
  );
});

// 清除所有错误消息的 atom
export const clearAllErrorMessagesAtom = atom(null, (_get, set) => {
  set(errorMessagesAtom, []);
});
