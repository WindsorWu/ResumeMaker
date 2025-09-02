/**
 * 列表编辑器业务逻辑 Hook
 */
import type { ListItem } from '@/types/resume';
import { useState } from 'react';

export const useListEditor = (
  isOpen: boolean,
  initialData: ListItem[],
  currentIcon: string,
  onSave: (data: ListItem[], iconName?: string) => void,
  onClose: () => void
) => {
  const [items, setItems] = useState<ListItem[]>(initialData);
  const [selectedIcon, setSelectedIcon] = useState(currentIcon);
  const [iconEnabled, setIconEnabled] = useState(!!currentIcon && currentIcon !== '');

  // 重置编辑器状态
  const resetEditor = () => {
    setItems(initialData);
    setSelectedIcon(currentIcon);
    setIconEnabled(!!currentIcon && currentIcon !== '');
  };

  // 监听打开状态，重置编辑器
  useState(() => {
    if (isOpen) {
      resetEditor();
    }
  });

  // 添加新项目
  const addItem = () => {
    const newItem: ListItem = {
      id: Date.now().toString(),
      content: '',
    };
    setItems([...items, newItem]);
  };

  // 删除项目
  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // 更新项目内容
  const updateItem = (id: string, content: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, content } : item)));
  };

  // 移动项目位置 (拖拽排序)
  const moveItem = (fromIndex: number, toIndex: number) => {
    const newItems = [...items];
    const [moved] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, moved);
    setItems(newItems);
  };

  // 图标开关切换
  const toggleIcon = (enabled: boolean) => {
    setIconEnabled(enabled);
  };

  // 保存
  const handleSave = () => {
    onSave(items, iconEnabled ? selectedIcon : '');
  };

  // 取消
  const handleCancel = () => {
    const hasChanges =
      JSON.stringify(items) !== JSON.stringify(initialData) ||
      selectedIcon !== currentIcon ||
      iconEnabled !== (!!currentIcon && currentIcon !== '');

    if (hasChanges) {
      const confirmed = window.confirm('有未保存的更改，确定要取消吗？');
      if (!confirmed) return;
    }
    resetEditor();
    onClose();
  };

  return {
    // 状态
    items,
    selectedIcon,
    iconEnabled,

    // 操作方法
    addItem,
    removeItem,
    updateItem,
    moveItem,
    setSelectedIcon,
    toggleIcon,
    handleSave,
    handleCancel,
    resetEditor,
  };
};
