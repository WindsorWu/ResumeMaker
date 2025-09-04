/**
 * 模块管理对话框 - 使用 @dnd-kit 库（懒加载组件）
 */
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useSectionManager } from '@/hooks/components/useSectionManager';
import { DndContext } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { GripVertical, Plus, Settings, Star } from 'lucide-react';
import { DraggableSectionItem } from './DraggableSectionItem';

interface SectionManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SectionManager = ({ isOpen, onClose }: SectionManagerProps) => {
  const {
    managedSections,
    editingId,
    editingTitle,
    setEditingTitle,
    deleteSection,
    addCustomSection,
    startEditing,
    saveEditing,
    cancelEditing,
    updateSectionIcon,
    getEditorType,
    updateEditorType,
    dragConfig,
  } = useSectionManager();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl font-semibold text-gray-900">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <span>模块管理</span>
          </DialogTitle>
          <DialogDescription>
            管理简历中的各个模块，包括显示顺序、编辑器类型和图标设置。拖拽调整顺序，所有更改将自动保存。
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 flex-1 overflow-y-auto">
          {/* 现有模块列表 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-gray-700">
                模块列表 ({managedSections.length})
              </Label>
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <GripVertical className="h-3 w-3" />
                拖拽调整顺序
              </div>
            </div>

            <DndContext sensors={dragConfig.sensors} onDragEnd={dragConfig.onDragEnd}>
              <SortableContext items={dragConfig.sortableItems} strategy={dragConfig.strategy}>
                <div className="space-y-3">
                  {managedSections.map((section) => (
                    <DraggableSectionItem
                      key={section.id}
                      section={section}
                      isEditing={editingId === section.id}
                      editingTitle={editingTitle}
                      onStartEditing={() => startEditing(section)}
                      onSaveEditing={saveEditing}
                      onCancelEditing={cancelEditing}
                      onTitleChange={setEditingTitle}
                      onIconChange={(iconName) => updateSectionIcon(section.id, iconName)}
                      onEditorTypeChange={(editorType) => updateEditorType(section.id, editorType)}
                      onDelete={() => deleteSection(section.id)}
                      getEditorType={getEditorType}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            {managedSections.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Star className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>还没有自定义模块</p>
                <p className="text-sm">点击下方按钮添加第一个模块</p>
              </div>
            )}
          </div>

          {/* 添加新模块 */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-gray-700">添加新模块</Label>
              <Button
                onClick={addCustomSection}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="h-4 w-4 mr-1" />
                添加模块
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              新添加的模块将显示在模块列表的最后，你可以通过拖拽调整位置。
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// 默认导出用于懒加载
export default SectionManager;
