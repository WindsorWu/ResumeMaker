/**
 * 简历模块项组件 - 简化版本
 */
import { Button } from '@/components/ui/button';
import type { ResumeSection } from '@/types/resume';
import { ChevronDown, ChevronUp, Edit, Plus, Trash2 } from 'lucide-react';
import { DynamicIcon } from 'lucide-react/dynamic';
import React, { memo } from 'react';

interface SectionItemProps {
  section: ResumeSection;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onAddItem?: () => void;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  children: React.ReactNode;
}

export const SectionItem = memo(
  ({
    section,
    isExpanded,
    onToggleExpanded,
    onEdit,
    onDelete,
    onAddItem,
    canMoveUp = false,
    canMoveDown = false,
    onMoveUp,
    onMoveDown,
    children,
  }: SectionItemProps) => {
    return (
      <div className="border border-gray-200 rounded-lg bg-white shadow-sm">
        {/* 标题栏 */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-t-lg">
          <div className="flex items-center gap-3">
            {/* 图标 */}
            {section.iconName && (
              <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-sm">
                <DynamicIcon name={section.iconName} className="h-4 w-4 text-gray-600" />
              </div>
            )}

            {/* 标题 */}
            <h3 className="font-medium text-gray-900">{section.title}</h3>

            {/* 项目数量标识 */}
            {section.data && Array.isArray(section.data) && section.data.length > 0 && (
              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
                {section.data.length} 项
              </span>
            )}
          </div>

          {/* 操作按钮组 */}
          <div className="flex items-center gap-1">
            {/* 添加项目按钮 */}
            {onAddItem && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onAddItem}
                className="h-8 w-8 p-0"
                title="添加项目"
              >
                <Plus className="h-4 w-4" />
              </Button>
            )}

            {/* 编辑按钮 */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onEdit}
              className="h-8 w-8 p-0"
              title="编辑模块"
            >
              <Edit className="h-4 w-4" />
            </Button>

            {/* 上移按钮 */}
            {onMoveUp && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onMoveUp}
                disabled={!canMoveUp}
                className="h-8 w-8 p-0"
                title="上移"
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
            )}

            {/* 下移按钮 */}
            {onMoveDown && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onMoveDown}
                disabled={!canMoveDown}
                className="h-8 w-8 p-0"
                title="下移"
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            )}

            {/* 删除按钮 */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
              title="删除模块"
            >
              <Trash2 className="h-4 w-4" />
            </Button>

            {/* 展开/收起按钮 */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleExpanded}
              className="h-8 w-8 p-0"
              title={isExpanded ? '收起' : '展开'}
            >
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* 内容区域 */}
        {isExpanded && <div className="p-4 border-t border-gray-100">{children}</div>}
      </div>
    );
  }
);

SectionItem.displayName = 'SectionItem';
