/**
 * 列表编辑器业务逻辑 Hook - 自动保存版本
 */
import { useAutoSaveDialog } from '@/hooks/useAutoSaveDialog';
import type { ListItem } from '@/types/resume';

interface ListEditorData {
  items: ListItem[];
  selectedIcon: string;
}

export const useListEditor = (
  isOpen: boolean,
  initialData: ListItem[],
  currentIcon: string,
  onSave: (data: ListItem[], iconName?: string) => void,
  onClose: () => void
) => {
  // 使用通用的自动保存对话框 Hook
  const { data, setData, handleClose, saveStatusText } = useAutoSaveDialog<ListEditorData>({
    isOpen,
    initialData: {
      items: initialData,
      selectedIcon: currentIcon,
    },
    onSave: (data) => onSave(data.items, data.selectedIcon),
    onClose,
    debounceDelay: 300,
  });

  const { items, selectedIcon } = data;

  // 设置项目列表
  const setItems = (newItems: ListItem[]) => {
    setData({ ...data, items: newItems });
  };

  // 设置选中图标
  const setSelectedIcon = (newIcon: string) => {
    setData({ ...data, selectedIcon: newIcon });
  };

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

  return {
    // 状态
    items,
    selectedIcon,
    saveStatusText,

    // 操作方法
    addItem,
    removeItem,
    updateItem,
    moveItem,
    setSelectedIcon,
    handleClose,
  };
};
