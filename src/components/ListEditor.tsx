/**
 * 列表编辑器 - 简洁版本
 */
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useListEditor } from '@/hooks/components/useListEditor';
import type { ListItem as ListItemType } from '@/types/resume';
import { Plus } from 'lucide-react';
import { IconSelectorWithToggle } from './IconSelectorWithToggle';
import { ListItem } from './ListItem';

interface ListEditorProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: ListItemType[];
  onSave: (data: ListItemType[], iconName?: string) => void;
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
  const {
    items,
    selectedIcon,
    iconEnabled,
    addItem,
    removeItem,
    updateItem,
    setSelectedIcon,
    toggleIcon,
    handleSave,
    handleCancel,
  } = useListEditor(isOpen, initialData, currentIcon, onSave, onClose);

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>编辑 {title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* 模块图标选择 */}
          <IconSelectorWithToggle
            selectedIcon={selectedIcon}
            onIconSelect={setSelectedIcon}
            onIconToggle={toggleIcon}
            initialEnabled={iconEnabled}
          />

          {/* 列表内容 */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">列表内容</label>
              <Button onClick={addItem} size="sm">
                <Plus className="h-4 w-4 mr-1" />
                添加项目
              </Button>
            </div>

            <div className="space-y-3">
              {items.map((item, index) => (
                <ListItem
                  key={item.id}
                  item={item}
                  index={index}
                  onUpdate={updateItem}
                  onRemove={removeItem}
                />
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
            <h4 className="text-sm font-medium text-blue-800 mb-2">💡 使用提示</h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• 适用于个人优势、技能特长等列表形式的内容</li>
              <li>• 每一项内容会在简历中自动编号显示</li>
              <li>• 可以拖拽调整项目顺序</li>
              <li>• 支持多行文本，详细描述您的优势</li>
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
