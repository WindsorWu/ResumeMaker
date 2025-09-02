/**
 * SectionManager 业务逻辑 Hook
 */
import type { ListItem, ResumeSection, TextContent, TimelineItem } from '@/types/resume';
import { useState } from 'react';

export const useSectionManager = (
  sections: ResumeSection[],
  onUpdateSections: (sections: ResumeSection[]) => void
) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [showIconSelector, setShowIconSelector] = useState<string | null>(null);

  // 只显示非basic类型的sections，按order排序
  const managedSections = sections
    .filter((section) => section.type !== 'basic')
    .sort((a, b) => a.order - b.order);

  // 获取模块的编辑器类型
  const getEditorType = (section: ResumeSection): 'timeline' | 'list' | 'text' => {
    return section.editorType || 'timeline';
  };

  // 转换数据结构
  const convertDataForEditorType = (
    currentData: TimelineItem[] | ListItem[] | TextContent,
    currentType: string,
    newType: string
  ): TimelineItem[] | ListItem[] | TextContent => {
    if (currentType === newType) {
      return currentData;
    }

    if (newType === 'timeline') {
      if (currentType === 'list') {
        // 列表转时间线
        return (currentData as ListItem[]).map((item) => ({
          id: item.id,
          title: item.content,
          subtitle: '',
          secondarySubtitle: '',
          startDate: '',
          endDate: '',
          description: '',
        }));
      } else if (currentType === 'text') {
        // 文本转时间线
        return [
          {
            id: '1',
            title: (currentData as TextContent).content,
            subtitle: '',
            secondarySubtitle: '',
            startDate: '',
            endDate: '',
            description: '',
          },
        ];
      }
    } else if (newType === 'list') {
      if (currentType === 'timeline') {
        // 时间线转列表
        return (currentData as TimelineItem[]).map((item) => ({
          id: item.id,
          content: item.title || item.description || '',
        }));
      } else if (currentType === 'text') {
        // 文本转列表
        const content = (currentData as TextContent).content;
        const lines = content.split('\n').filter((line) => line.trim());
        return lines.map((line, index) => ({
          id: (index + 1).toString(),
          content: line.trim(),
        }));
      }
    } else if (newType === 'text') {
      if (currentType === 'timeline') {
        // 时间线转文本
        const items = currentData as TimelineItem[];
        const text = items
          .map((item) => [item.title, item.description].filter(Boolean).join('\n'))
          .join('\n\n');
        return { content: text };
      } else if (currentType === 'list') {
        // 列表转文本
        const items = currentData as ListItem[];
        const text = items.map((item) => item.content).join('\n');
        return { content: text };
      }
    }

    return currentData;
  };

  // 更新模块的编辑器类型
  const updateEditorType = (sectionId: string, newEditorType: 'timeline' | 'list' | 'text') => {
    const section = sections.find((s) => s.id === sectionId);
    if (!section) return;

    const currentEditorType = getEditorType(section);
    const convertedData = convertDataForEditorType(
      section.data as TimelineItem[] | ListItem[] | TextContent,
      currentEditorType,
      newEditorType
    );

    const updatedSections = sections.map((s) =>
      s.id === sectionId
        ? {
            ...s,
            editorType: newEditorType,
            type: newEditorType as ResumeSection['type'],
            data: convertedData,
          }
        : s
    );
    onUpdateSections(updatedSections);
  };

  // 拖拽处理
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;

    const newSections = [...managedSections];
    const draggedSection = newSections[draggedIndex];

    // 移除被拖拽的元素并插入到新位置
    newSections.splice(draggedIndex, 1);
    newSections.splice(dropIndex, 0, draggedSection);

    // 重新分配order
    const updatedSections = newSections.map((section, index) => ({
      ...section,
      order: index + 2, // 基本信息的order是1，所以timeline从2开始
    }));

    // 更新完整的sections数组
    const allSections = sections.map((section) => {
      if (section.type !== 'basic') {
        const updatedSection = updatedSections.find((s) => s.id === section.id);
        return updatedSection || section;
      }
      return section;
    });

    onUpdateSections(allSections);
    setDraggedIndex(null);
  };

  // 切换可见性
  const toggleVisibility = (sectionId: string) => {
    const updatedSections = sections.map((section) =>
      section.id === sectionId ? { ...section, visible: !section.visible } : section
    );
    onUpdateSections(updatedSections);
  };

  // 删除模块
  const deleteSection = (sectionId: string) => {
    const updatedSections = sections.filter((section) => section.id !== sectionId);
    onUpdateSections(updatedSections);
  };

  // 添加自定义模块
  const addCustomSection = () => {
    const newOrder = Math.max(...managedSections.map((s) => s.order), 1) + 1;
    const newSection: ResumeSection = {
      id: `custom-${Date.now()}`,
      title: '自定义模块',
      icon: 'star',
      iconName: 'star',
      type: 'timeline',
      visible: true,
      order: newOrder,
      data: [],
    };

    onUpdateSections([...sections, newSection]);
  };

  // 编辑标题
  const startEditing = (section: ResumeSection) => {
    setEditingId(section.id);
    setEditingTitle(section.title);
  };

  const saveEditing = () => {
    if (!editingId || !editingTitle.trim()) return;

    const updatedSections = sections.map((section) =>
      section.id === editingId ? { ...section, title: editingTitle.trim() } : section
    );
    onUpdateSections(updatedSections);
    setEditingId(null);
    setEditingTitle('');
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingTitle('');
  };

  // 更新图标
  const updateSectionIcon = (sectionId: string, iconName: string) => {
    const updatedSections = sections.map((section) =>
      section.id === sectionId ? { ...section, iconName, icon: iconName } : section
    );
    onUpdateSections(updatedSections);
    setShowIconSelector(null);
  };

  return {
    // 状态
    managedSections,
    draggedIndex,
    editingId,
    editingTitle,
    showIconSelector,

    // 状态设置
    setEditingTitle,
    setShowIconSelector,

    // 方法
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
  };
};
