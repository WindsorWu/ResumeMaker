/**
 * 可拖拽的模块项组件
 */
import { SimpleIconInput } from '@/components/SimpleIconInput';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { isValidIconName } from '@/lib/iconUtils';
import { asIconName } from '@/types/icon';
import type { ResumeSection } from '@/types/resume';
import { Check, Edit, GripVertical, Star, Trash2, X } from 'lucide-react';
import { DynamicIcon } from 'lucide-react/dynamic';
import React from 'react';
import { EDITOR_TYPE_OPTIONS } from './editorTypeConstants';

export interface DraggableSectionItemProps {
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

export const DraggableSectionItem: React.FC<DraggableSectionItemProps> = ({
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
              <SimpleIconInput
                value={section.iconName || ''}
                onChange={onIconChange}
                placeholder="图标名称 (如: star, heart, user)"
                label=""
              />

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
