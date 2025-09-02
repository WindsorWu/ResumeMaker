/**
 * 时间线展示组件业务逻辑 Hook
 */
import type { ListItem, ResumeSection, TextContent, TimelineItem } from '@/types/resume';
import { useState } from 'react';

export const useTimelineSection = (
  section: ResumeSection,
  onUpdate: (data: TimelineItem[] | ListItem[] | TextContent, iconName?: string) => void
) => {
  const [isEditing, setIsEditing] = useState(false);

  // 获取编辑器类型
  const getEditorType = (): 'timeline' | 'list' | 'text' => {
    return section.editorType || 'timeline';
  };

  // 开始编辑
  const startEditing = () => {
    setIsEditing(true);
  };

  // 关闭编辑
  const closeEditing = () => {
    setIsEditing(false);
  };

  // 保存数据
  const handleSave = (data: TimelineItem[] | ListItem[] | TextContent, iconName?: string) => {
    onUpdate(data, iconName);
    // setIsEditing(false);
  };

  // 获取编辑器组件的props
  const getEditorProps = () => {
    const editorType = getEditorType();
    const baseProps = {
      isOpen: isEditing,
      onClose: closeEditing,
      onSave: handleSave,
      title: section.title,
      currentIcon: section.iconName || 'briefcase',
    };

    if (editorType === 'timeline') {
      return {
        ...baseProps,
        initialData: section.data as TimelineItem[],
      };
    } else if (editorType === 'list') {
      return {
        ...baseProps,
        initialData: section.data as ListItem[],
      };
    } else {
      return {
        ...baseProps,
        initialData: section.data as TextContent,
      };
    }
  };

  return {
    // 状态
    isEditing,
    editorType: getEditorType(),

    // 操作方法
    startEditing,
    closeEditing,
    handleSave,
    getEditorProps,
  };
};
