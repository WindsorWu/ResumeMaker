/**
 * 可复用的模块项组件
 */
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getIconByName } from '@/config/icons';
import type { ResumeSection, TimelineItem } from '@/types/resume';
import {
  Check,
  Clock,
  Edit3,
  Eye,
  EyeOff,
  FileText,
  GripVertical,
  List,
  Trash2,
  X,
} from 'lucide-react';
import { IconSelector } from './IconSelector';

interface SectionItemProps {
  section: ResumeSection;
  index: number;
  isDragging: boolean;
  isEditing: boolean;
  editingTitle: string;
  showIconSelector: boolean;
  onDragStart: (index: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
  onStartEditing: (section: ResumeSection) => void;
  onSaveEditing: () => void;
  onCancelEditing: () => void;
  onTitleChange: (title: string) => void;
  onToggleIconSelector: (sectionId: string) => void;
  onIconSelect: (sectionId: string, iconName: string) => void;
  onEditorTypeChange: (sectionId: string, editorType: 'timeline' | 'list' | 'text') => void;
  onToggleVisibility: (sectionId: string) => void;
  onDelete: (sectionId: string) => void;
  getEditorType: (section: ResumeSection) => 'timeline' | 'list' | 'text';
}

const EDITOR_TYPE_OPTIONS = [
  { value: 'timeline', label: '多样式编辑器', icon: Clock },
  { value: 'list', label: '列表编辑器', icon: List },
  { value: 'text', label: '纯文本编辑器', icon: FileText },
];

export const SectionItem = ({
  section,
  index,
  isDragging,
  isEditing,
  editingTitle,
  showIconSelector,
  onDragStart,
  onDragOver,
  onDrop,
  onStartEditing,
  onSaveEditing,
  onCancelEditing,
  onTitleChange,
  onToggleIconSelector,
  onIconSelect,
  onEditorTypeChange,
  onToggleVisibility,
  onDelete,
  getEditorType,
}: SectionItemProps) => {
  const IconComponent = getIconByName(section.iconName);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') onSaveEditing();
    if (e.key === 'Escape') onCancelEditing();
  };

  return (
    <div
      className={`bg-white border rounded-lg p-4 transition-all duration-200 ${
        isDragging ? 'opacity-50' : 'hover:shadow-md'
      }`}
      draggable
      onDragStart={() => onDragStart(index)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, index)}
    >
      <div className="flex items-center space-x-3">
        {/* 拖拽手柄 */}
        <div className="cursor-move text-gray-400 hover:text-gray-600">
          <GripVertical className="h-4 w-4" />
        </div>

        {/* 图标 */}
        <div
          className="p-1.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-md cursor-pointer hover:scale-105 transition-transform"
          onClick={() => onToggleIconSelector(section.id)}
        >
          {IconComponent && <IconComponent className="h-4 w-4 text-white" />}
        </div>

        {/* 标题编辑 */}
        <div className="flex-1">
          {isEditing ? (
            <div className="flex items-center space-x-2">
              <Input
                value={editingTitle}
                onChange={(e) => onTitleChange(e.target.value)}
                className="text-sm h-8"
                onKeyDown={handleKeyDown}
                autoFocus
              />
              <Button
                size="sm"
                variant="ghost"
                onClick={onSaveEditing}
                className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={onCancelEditing}
                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-800">{section.title}</span>
                <span className="text-xs text-gray-500">
                  ({(section.data as TimelineItem[]).length} 项)
                </span>
              </div>

              <div className="flex items-center space-x-1">
                {/* 编辑标题 */}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onStartEditing(section)}
                  className="h-8 w-8 p-0 text-gray-600 hover:text-gray-700 hover:bg-gray-100"
                >
                  <Edit3 className="h-3 w-3" />
                </Button>

                {/* 编辑器类型选择 */}
                <select
                  onChange={(e) =>
                    onEditorTypeChange(section.id, e.target.value as 'timeline' | 'list' | 'text')
                  }
                  value={getEditorType(section)}
                  className="h-8 w-24 text-xs rounded border border-gray-300 bg-white px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {EDITOR_TYPE_OPTIONS.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>

                {/* 显示/隐藏切换 */}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onToggleVisibility(section.id)}
                  className={`h-8 w-8 p-0 ${
                    section.visible
                      ? 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
                      : 'text-gray-400 hover:text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {section.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </Button>

                {/* 删除按钮 */}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onDelete(section.id)}
                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 图标选择器 */}
      {showIconSelector && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <IconSelector
            selectedIcon={section.iconName}
            onIconSelect={(iconName) => onIconSelect(section.id, iconName)}
          />
        </div>
      )}
    </div>
  );
};
