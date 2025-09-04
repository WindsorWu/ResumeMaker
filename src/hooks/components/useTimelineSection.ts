/**
 * 时间线展示组件业务逻辑 Hook - 优化版本
 * 直接使用状态管理，无需层层传递回调函数
 */
import { useResumeEditor } from '@/hooks/components/useResumeEditor';
import type { ListItem, ResumeSection, TextContent, TimelineItem } from '@/types/resume';
import { useState } from 'react';

export const useTimelineSection = (section: ResumeSection) => {
  const [isEditing, setIsEditing] = useState(false);
  const { handleTimelineSave, handleListSave, handleTextSave } = useResumeEditor(section.id);

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

  // 保存数据 - 根据编辑器类型调用对应的保存方法
  const handleSave = (data: TimelineItem[] | ListItem[] | TextContent, iconName?: string) => {
    const editorType = getEditorType();

    if (editorType === 'timeline') {
      handleTimelineSave(data as TimelineItem[], iconName);
    } else if (editorType === 'list') {
      handleListSave(data as ListItem[], iconName);
    } else {
      handleTextSave(data as TextContent, iconName);
    }
    // setIsEditing(false); // 可以选择保存后是否关闭编辑器
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
