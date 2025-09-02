/**
 * 多样式编辑器 - 简洁版本
 */
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { getIconByName } from '@/config/icons';
import { useTimelineEditor } from '@/hooks/components/useTimelineEditor';
import type { TimelineItem as TimelineItemType } from '@/types/resume';
import { Plus } from 'lucide-react';
import { IconSelectorSection } from './IconSelectorSection';
import { TimelineItem } from './TimelineItem';

interface TimelineEditorProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: TimelineItemType[];
  onSave: (data: TimelineItemType[], iconName?: string) => void;
  title: string;
  currentIcon?: string;
}

export const TimelineEditor = ({
  isOpen,
  onClose,
  initialData,
  onSave,
  title,
  currentIcon = 'briefcase',
}: TimelineEditorProps) => {
  const {
    items,
    selectedIcon,
    isIconSelectorOpen,
    saveStatusText,
    addItem,
    removeItem,
    updateItem,
    setSelectedIcon,
    toggleIconSelector,
    handleClose,
  } = useTimelineEditor(isOpen, initialData, currentIcon, onSave, onClose);

  const IconComponent = getIconByName(selectedIcon);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800 flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              {IconComponent && <IconComponent className="h-5 w-5 text-white" />}
            </div>
            <span>编辑{title}</span>
            <span className="text-sm font-normal text-gray-500 ml-auto">{saveStatusText}</span>
          </DialogTitle>
          <DialogDescription>在此处编辑您的{title}信息，所有更改将自动保存。</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* 图标选择区域 */}
          <IconSelectorSection
            selectedIcon={selectedIcon}
            isOpen={isIconSelectorOpen}
            onToggle={toggleIconSelector}
            onIconSelect={setSelectedIcon}
          />

          {/* 时间线项目列表 */}
          {items.map((item, index) => (
            <TimelineItem
              key={item.id}
              item={item}
              index={index}
              onUpdate={updateItem}
              onRemove={removeItem}
            />
          ))}

          {/* 添加新项目按钮 */}
          <Button
            onClick={addItem}
            variant="outline"
            className="w-full border-dashed border-2 hover:bg-blue-50"
          >
            <Plus className="h-4 w-4 mr-2" />
            添加一项
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
