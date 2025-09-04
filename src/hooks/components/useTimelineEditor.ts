/**
 * 时间线编辑器业务逻辑 Hook
 */
import { useAutoSaveDialog } from '@/hooks/useAutoSaveDialog';
import type { TimelineItem } from '@/types/resume';
import type { DragEndEvent } from '@dnd-kit/core';
import { PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from 'react';

interface TimelineEditorData {
  items: TimelineItem[];
  selectedIcon: string;
  iconEnabled: boolean;
}

export const useTimelineEditor = (
  isOpen: boolean,
  initialData: TimelineItem[],
  currentIcon: string,
  onSave: (data: TimelineItem[], iconName?: string) => void,
  onClose: () => void
) => {
  const [isIconSelectorOpen, setIsIconSelectorOpen] = useState(false);

  // 配置拖拽传感器
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 移动8px才开始拖拽，避免误触
      },
    })
  );

  // 使用通用的自动保存对话框 Hook
  const { data, setData, handleClose, saveStatusText } = useAutoSaveDialog<TimelineEditorData>({
    isOpen,
    initialData: {
      items: initialData,
      selectedIcon: currentIcon,
      iconEnabled: !!currentIcon && currentIcon !== '',
    },
    onSave: (data) => onSave(data.items, data.iconEnabled ? data.selectedIcon : ''),
    onClose,
    debounceDelay: 500,
  });

  const { items, selectedIcon, iconEnabled } = data;

  // 设置项目列表
  const setItems = (newItems: TimelineItem[]) => {
    setData({ ...data, items: newItems });
  };

  // 设置选中图标
  const setSelectedIcon = (newIcon: string) => {
    setData({ ...data, selectedIcon: newIcon });
  };

  // 设置图标启用状态
  const setIconEnabled = (enabled: boolean) => {
    setData({ ...data, iconEnabled: enabled });
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

  // 拖拽结束处理
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);
    }
  };

  // 切换图标选择器
  const toggleIconSelector = () => {
    setIsIconSelectorOpen(!isIconSelectorOpen);
  };

  return {
    // 状态
    items,
    selectedIcon,
    iconEnabled,
    isIconSelectorOpen,
    saveStatusText,

    // 拖拽配置
    dragConfig: {
      sensors,
      onDragEnd: handleDragEnd,
      sortableItems: items.map((item) => item.id),
      strategy: verticalListSortingStrategy,
    },

    // 操作方法
    addItem,
    removeItem,
    updateItem,
    setSelectedIcon,
    setIconEnabled,
    toggleIconSelector,
    handleClose,
  };
};
