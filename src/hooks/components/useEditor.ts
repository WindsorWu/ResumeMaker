/**
 * 通用编辑器业务逻辑 Hook
 */
import { useState } from 'react';

export interface EditorState<T> {
  data: T;
  selectedIcon: string;
}

export const useEditor = <T>(
  isOpen: boolean,
  initialData: T,
  initialIcon: string,
  onSave: (data: T, iconName?: string) => void,
  onClose: () => void
) => {
  const [data, setData] = useState<T>(initialData);
  const [selectedIcon, setSelectedIcon] = useState(initialIcon);
  const [hasChanges, setHasChanges] = useState(false);

  // 重置编辑器状态
  const resetEditor = () => {
    setData(initialData);
    setSelectedIcon(initialIcon);
    setHasChanges(false);
  };

  // 更新数据
  const updateData = (newData: T) => {
    setData(newData);
    setHasChanges(true);
  };

  // 更新图标
  const updateIcon = (iconName: string) => {
    setSelectedIcon(iconName);
    setHasChanges(true);
  };

  // 保存
  const handleSave = () => {
    onSave(data, selectedIcon);
    setHasChanges(false);
  };

  // 取消
  const handleCancel = () => {
    if (hasChanges) {
      const confirmed = window.confirm('有未保存的更改，确定要取消吗？');
      if (!confirmed) return;
    }
    resetEditor();
    onClose();
  };

  // 监听打开状态，重置编辑器
  useState(() => {
    if (isOpen) {
      resetEditor();
    }
  });

  return {
    data,
    selectedIcon,
    hasChanges,
    updateData,
    updateIcon,
    handleSave,
    handleCancel,
    resetEditor,
  };
};
