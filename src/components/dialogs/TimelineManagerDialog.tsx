/**
 * 模块管理器 - 增强版本，支持拖拽、编辑器类型选择
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
import type { ResumeSection } from '@/types/resume';
import { GripVertical, Plus, Settings, Star } from 'lucide-react';
import { DraggableSectionItem } from './DraggableSectionItem';

interface SectionManagerProps {
  isOpen: boolean;
  onClose: () => void;
  sections: ResumeSection[];
  onUpdateSections: (sections: ResumeSection[]) => void;
}

export const SectionManager = ({
  isOpen,
  onClose,
  sections,
  onUpdateSections,
}: SectionManagerProps) => {
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
    handleDragStart,
    handleDragOver,
    handleDrop,
  } = useSectionManager(sections, onUpdateSections);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <span>模块管理</span>
          </DialogTitle>
          <DialogDescription>
            拖拽调整模块顺序，选择合适的编辑器类型，自定义模块标题和图标。
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
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

            <div className="space-y-3">
              {managedSections.map((section, index) => (
                <DraggableSectionItem
                  key={section.id}
                  section={section}
                  index={index}
                  isEditing={editingId === section.id}
                  editingTitle={editingTitle}
                  onStartEditing={() => startEditing(section)}
                  onSaveEditing={saveEditing}
                  onCancelEditing={cancelEditing}
                  onTitleChange={setEditingTitle}
                  onIconChange={(iconName) => updateSectionIcon(section.id, iconName)}
                  onEditorTypeChange={(editorType) => updateEditorType(section.id, editorType)}
                  onDelete={() => deleteSection(section.id)}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  getEditorType={getEditorType}
                />
              ))}
            </div>

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
            <Button
              onClick={addCustomSection}
              variant="outline"
              className="w-full border-dashed border-2 h-12 hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              添加自定义模块
            </Button>
          </div>

          {/* 使用提示 */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="text-sm text-amber-800">
              <p className="font-medium mb-2">💡 使用提示：</p>
              <ul className="space-y-1 text-xs">
                <li>• 拖拽模块可以调整在简历中的显示顺序</li>
                <li>• 不同编辑器类型适合不同的内容，选择后数据会自动转换</li>
                <li>• 图标名称请使用 Lucide Icons 的名称，如：star、heart、user 等</li>
                <li>• 删除模块会永久移除该模块及其所有数据，请谨慎操作</li>
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
