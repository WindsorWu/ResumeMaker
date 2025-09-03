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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { useSectionManager } from '@/hooks/components/useSectionManager';
import { isValidIconName } from '@/lib/iconUtils';
import { asIconName } from '@/types/icon';
import type { ResumeSection } from '@/types/resume';
import {
  Calendar,
  Check,
  Edit,
  GripVertical,
  List,
  Plus,
  Settings,
  Star,
  Trash2,
  Type,
  X,
} from 'lucide-react';
import { DynamicIcon } from 'lucide-react/dynamic';
import React, { useState } from 'react';

interface SectionManagerProps {
  isOpen: boolean;
  onClose: () => void;
  sections: ResumeSection[];
  onUpdateSections: (sections: ResumeSection[]) => void;
}

// 编辑器类型选项
const EDITOR_TYPE_OPTIONS = [
  {
    value: 'timeline',
    label: '时间线编辑器',
    description: '适合工作经历、教育背景等时序信息',
    icon: Calendar,
  },
  {
    value: 'list',
    label: '列表编辑器',
    description: '适合技能清单、证书列表等',
    icon: List,
  },
  {
    value: 'text',
    label: '文本编辑器',
    description: '适合自我介绍、备注等自由文本',
    icon: Type,
  },
];

// 可拖拽的模块项组件
interface DraggableSectionItemProps {
  section: ResumeSection;
  index: number;
  isEditing: boolean;
  editingTitle: string;
  onStartEditing: () => void;
  onSaveEditing: () => void;
  onCancelEditing: () => void;
  onTitleChange: (title: string) => void;
  onIconChange: (iconName: string) => void;
  onEditorTypeChange: (editorType: 'timeline' | 'list' | 'text') => void;
  onDelete: () => void;
  onDragStart: (index: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
  getEditorType: (section: ResumeSection) => 'timeline' | 'list' | 'text';
}

const DraggableSectionItem: React.FC<DraggableSectionItemProps> = ({
  section,
  index,
  isEditing,
  editingTitle,
  onStartEditing,
  onSaveEditing,
  onCancelEditing,
  onTitleChange,
  onIconChange,
  onEditorTypeChange,
  onDelete,
  onDragStart,
  onDragOver,
  onDrop,
  getEditorType,
}) => {
  const [iconInput, setIconInput] = useState(section.iconName || '');
  const currentEditorType = getEditorType(section);
  const currentOption = EDITOR_TYPE_OPTIONS.find((opt) => opt.value === currentEditorType);

  const handleEditorTypeChange = (value: string) => {
    const editorType = value as 'timeline' | 'list' | 'text';
    onEditorTypeChange(editorType);
  };

  return (
    <div
      draggable
      onDragStart={() => onDragStart(index)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, index)}
      className="group border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-200 cursor-move"
    >
      <div className="flex items-center gap-3 p-4">
        {/* 拖拽手柄 */}
        <div className="text-gray-400 group-hover:text-gray-600">
          <GripVertical className="h-5 w-5" />
        </div>

        {/* 模块图标 */}
        <div className="flex items-center justify-center w-10 h-10 bg-gray-50 rounded-full">
          {section.iconName && isValidIconName(section.iconName) ? (
            <DynamicIcon name={asIconName(section.iconName)} className="h-5 w-5 text-gray-600" />
          ) : (
            <Star className="h-5 w-5 text-gray-400" />
          )}
        </div>

        {/* 模块信息 */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-3">
              {/* 标题编辑 */}
              <Input
                value={editingTitle}
                onChange={(e) => onTitleChange(e.target.value)}
                placeholder="模块标题"
                className="text-sm"
              />

              {/* 图标编辑 */}
              <div className="flex items-center gap-2">
                <Input
                  value={iconInput}
                  onChange={(e) => setIconInput(e.target.value)}
                  placeholder="图标名称 (如: star, heart, user)"
                  className="text-sm flex-1"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onIconChange(iconInput)}
                  disabled={!iconInput || !isValidIconName(iconInput)}
                  className="px-3"
                >
                  应用
                </Button>
              </div>

              {/* 编辑器类型选择 */}
              <div className="space-y-2">
                <Label className="text-xs text-gray-600">编辑器类型</Label>
                <Select
                  value={currentEditorType}
                  onValueChange={handleEditorTypeChange}
                  options={EDITOR_TYPE_OPTIONS}
                  className="text-sm"
                />
                <div className="text-xs text-gray-500">{currentOption?.description}</div>
              </div>

              {/* 编辑操作按钮 */}
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={onCancelEditing}>
                  <X className="h-4 w-4 mr-1" />
                  取消
                </Button>
                <Button size="sm" onClick={onSaveEditing} disabled={!editingTitle.trim()}>
                  <Check className="h-4 w-4 mr-1" />
                  保存
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-gray-900 truncate">{section.title}</h3>
                {section.data && Array.isArray(section.data) && (
                  <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-full">
                    {section.data.length}项
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                {currentOption && (
                  <>
                    <currentOption.icon className="h-4 w-4" />
                    <span>{currentOption.label}</span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 操作按钮 */}
        {!isEditing && (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={onStartEditing}
              className="h-8 w-8 p-0"
              title="编辑模块"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
              title="删除模块"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

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

          {/* 编辑器类型说明 */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
              <Star className="h-4 w-4 text-blue-500" />
              编辑器类型说明
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              {EDITOR_TYPE_OPTIONS.map((option) => (
                <div key={option.value} className="flex items-start gap-2">
                  <option.icon className="h-4 w-4 mt-0.5 text-gray-600 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-800">{option.label}</div>
                    <div className="text-gray-600 text-xs">{option.description}</div>
                  </div>
                </div>
              ))}
            </div>
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
