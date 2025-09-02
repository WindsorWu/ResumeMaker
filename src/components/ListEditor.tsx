/**
 * 列表编辑器组件 - 用于编辑个人优势等列表内容
 */
import { useState } from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { IconSelector } from './IconSelector';
import type { ListItem } from '@/types/resume';

interface ListEditorProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: ListItem[];
  onSave: (data: ListItem[], iconName?: string) => void;
  title: string;
  currentIcon: string;
}

export const ListEditor = ({
  isOpen,
  onClose,
  initialData,
  onSave,
  title,
  currentIcon,
}: ListEditorProps) => {
  const [items, setItems] = useState<ListItem[]>(initialData);
  const [selectedIcon, setSelectedIcon] = useState(currentIcon);

  const addItem = () => {
    const newItem: ListItem = {
      id: Date.now().toString(),
      content: '',
    };
    setItems([...items, newItem]);
  };

  const updateItem = (id: string, content: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, content } : item)));
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleSave = () => {
    const validItems = items.filter((item) => item.content.trim() !== '');
    onSave(validItems, selectedIcon);
    onClose();
  };

  const handleCancel = () => {
    setItems(initialData);
    setSelectedIcon(currentIcon);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>编辑 {title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* 图标选择 */}
          <div>
            <label className="block text-sm font-medium mb-2">模块图标</label>
            <IconSelector selectedIcon={selectedIcon} onIconSelect={setSelectedIcon} />
          </div>

          {/* 列表项编辑 */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium">列表内容</label>
              <Button onClick={addItem} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                添加项目
              </Button>
            </div>

            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={item.id} className="flex items-start space-x-2 group">
                  {/* 拖拽手柄 */}
                  <div className="flex flex-col items-center mt-2">
                    <GripVertical className="h-4 w-4 text-gray-400 cursor-move opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-xs text-gray-500 mt-1">{index + 1}</span>
                  </div>

                  {/* 内容输入 */}
                  <div className="flex-1">
                    <Textarea
                      value={item.content}
                      onChange={(e) => updateItem(item.id, e.target.value)}
                      placeholder={`请输入第 ${index + 1} 项内容...`}
                      className="min-h-[80px] resize-none"
                    />
                  </div>

                  {/* 删除按钮 */}
                  <Button
                    onClick={() => removeItem(item.id)}
                    variant="ghost"
                    size="sm"
                    className="mt-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              {items.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>暂无内容，点击"添加项目"开始创建</p>
                </div>
              )}
            </div>
          </div>

          {/* 使用提示 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-900 mb-2">📝 使用提示</h4>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• 适合编辑个人优势、技能清单等列表型内容</li>
              <li>• 每个列表项可以是一段完整的描述</li>
              <li>• 支持多行文本，换行会自动保留</li>
              <li>• 可以通过拖拽调整项目顺序</li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            取消
          </Button>
          <Button onClick={handleSave}>保存</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
