/**
 * 模块管理器 - 简洁UI版本
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
import { Plus, Settings } from 'lucide-react';
import { SectionItem } from './SectionItem';

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
    draggedIndex,
    editingId,
    editingTitle,
    showIconSelector,
    setEditingTitle,
    setShowIconSelector,
    getEditorType,
    updateEditorType,
    handleDragStart,
    handleDragOver,
    handleDrop,
    toggleVisibility,
    deleteSection,
    addCustomSection,
    startEditing,
    saveEditing,
    cancelEditing,
    updateSectionIcon,
  } = useSectionManager(sections, onUpdateSections);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800 flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <Settings className="h-5 w-5 text-white" />
            </div>
            <span>模块管理</span>
          </DialogTitle>
          <DialogDescription>
            管理您的简历模块：调整显示顺序、自定义标题、选择编辑器类型。
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* 现有模块列表 */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">
              现有模块 ({managedSections.length})
            </Label>

            {managedSections.map((section, index) => (
              <SectionItem
                key={section.id}
                section={section}
                index={index}
                isDragging={draggedIndex === index}
                isEditing={editingId === section.id}
                editingTitle={editingTitle}
                showIconSelector={showIconSelector === section.id}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onStartEditing={startEditing}
                onSaveEditing={saveEditing}
                onCancelEditing={cancelEditing}
                onTitleChange={setEditingTitle}
                onToggleIconSelector={(sectionId) =>
                  setShowIconSelector(showIconSelector === sectionId ? null : sectionId)
                }
                onIconSelect={updateSectionIcon}
                onEditorTypeChange={updateEditorType}
                onToggleVisibility={toggleVisibility}
                onDelete={deleteSection}
                getEditorType={getEditorType}
              />
            ))}
          </div>

          {/* 添加新模块按钮 */}
          <Button
            onClick={addCustomSection}
            variant="outline"
            className="w-full border-dashed border-2 hover:bg-blue-50 hover:border-blue-300"
          >
            <Plus className="h-4 w-4 mr-2" />
            添加自定义模块
          </Button>

          {/* 提示信息 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-700">
              💡
              提示：拖拽模块可以调整显示顺序，下拉框可以选择编辑器类型，点击图标可以更换模块图标。
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
