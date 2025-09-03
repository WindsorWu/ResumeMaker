/**
 * 列表编辑器 - 自动保存版本
 */
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useListEditor } from '@/hooks/components/useListEditor';
import type { ListItem as ListItemType } from '@/types/resume';
import { Plus } from 'lucide-react';
import { DynamicIcon, type IconName } from 'lucide-react/dynamic';
import { SimpleIconInput } from '../SimpleIconInput';
import { ListEditorItem } from './ListEditorItem';

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
    saveStatusText,
    addItem,
    removeItem,
    updateItem,
    setSelectedIcon,
    handleClose,
  } = useListEditor(isOpen, initialData, currentIcon, onSave, onClose);

  // 直接使用 DynamicIcon

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800 flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg">
              {iconEnabled && selectedIcon && (
                <DynamicIcon name={selectedIcon as IconName} className="h-5 w-5 text-white" />
              )}
            </div>
            <span>编辑{title}</span>
            <span className="text-sm font-normal text-gray-500 ml-auto">{saveStatusText}</span>
          </DialogTitle>
          <DialogDescription>在此处编辑您的{title}信息，所有更改将自动保存。</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* 模块图标选择 */}
          <SimpleIconInput
            value={selectedIcon as IconName}
            onChange={setSelectedIcon}
            label="图标"
            placeholder="输入图标名称，如 globe, link, github..."
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
                <ListEditorItem
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
      </DialogContent>
    </Dialog>
  );
};
