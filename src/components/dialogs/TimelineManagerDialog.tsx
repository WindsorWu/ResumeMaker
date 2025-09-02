/**
 * 模块管理器
 */
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSectionManager } from '@/hooks/components/useSectionManager';
import type { ResumeSection } from '@/types/resume';
import { Plus, Settings } from 'lucide-react';
import { SectionItem } from '../SectionItem';

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
    showIconSelector,
    setEditingTitle,
    setShowIconSelector,
    deleteSection,
    addCustomSection,
    startEditing,
    saveEditing,
    cancelEditing,
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
                isExpanded={showIconSelector === section.id}
                onToggleExpanded={() =>
                  setShowIconSelector(showIconSelector === section.id ? null : section.id)
                }
                onEdit={() => startEditing(section)}
                onDelete={() => deleteSection(section.id)}
                canMoveUp={index > 0}
                canMoveDown={index < managedSections.length - 1}
                onMoveUp={() => {
                  // TODO: 实现移动逻辑
                  console.log('Move up:', section.id);
                }}
                onMoveDown={() => {
                  // TODO: 实现移动逻辑
                  console.log('Move down:', section.id);
                }}
              >
                {/* 编辑内容 */}
                {editingId === section.id && (
                  <div className="space-y-3">
                    <Input
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      placeholder="模块标题"
                    />
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm" onClick={cancelEditing}>
                        取消
                      </Button>
                      <Button size="sm" onClick={saveEditing}>
                        保存
                      </Button>
                    </div>
                  </div>
                )}
              </SectionItem>
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
