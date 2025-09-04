/**
 * SectionManager 业务逻辑 Hook - 使用 @dnd-kit 库重构版本
 * 使用新的状态管理，不再需要层层传递回调
 */
import { useResumeActions } from '@/hooks/useResumeActions';
import type { ListItem, ResumeSection, TextContent, TimelineItem } from '@/types/resume';
import type { DragEndEvent } from '@dnd-kit/core';
import { PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from 'react';

export const useSectionManager = () => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [showIconSelector, setShowIconSelector] = useState<string | null>(null);

  // 配置传感器
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 移动8px才开始拖拽，避免误触
      },
    })
  );

  // 使用新的状态管理
  const {
    getNonBasicSections,
    updateSectionsOrder,
    updateSection,
    updateSectionTitle,
    updateSectionIcon,
    updateSectionEditorType,
    toggleSectionVisibility,
    deleteSection: deleteSectionFromStore,
    addSection,
    getSection,
  } = useResumeActions();

  // 获取管理的模块列表
  const managedSections = getNonBasicSections;

  // 获取模块的编辑器类型
  const getEditorType = (section: ResumeSection): 'timeline' | 'list' | 'text' => {
    return section.editorType || 'timeline';
  };

  // 转换数据结构（保持原有逻辑）
  const convertDataForEditorType = (
    data: TimelineItem[] | ListItem[] | TextContent,
    fromType: 'timeline' | 'list' | 'text',
    toType: 'timeline' | 'list' | 'text'
  ): TimelineItem[] | ListItem[] | TextContent => {
    if (fromType === toType) return data;

    // Timeline -> List
    if (fromType === 'timeline' && toType === 'list') {
      const timelineData = data as TimelineItem[];
      return timelineData.map((item) => ({
        id: item.id,
        content: `${item.title}${item.subtitle ? ` - ${item.subtitle}` : ''}${
          item.description ? `: ${item.description}` : ''
        }`,
      }));
    }

    // List -> Timeline
    if (fromType === 'list' && toType === 'timeline') {
      const listData = data as ListItem[];
      return listData.map((item) => ({
        id: item.id,
        title: item.content.slice(0, 50) + (item.content.length > 50 ? '...' : ''),
        subtitle: '',
        secondarySubtitle: '',
        startDate: '',
        endDate: '',
        description: item.content,
      }));
    }

    // Timeline/List -> Text
    if (toType === 'text') {
      if (fromType === 'timeline') {
        const timelineData = data as TimelineItem[];
        return {
          content: timelineData
            .map((item) => `${item.title}\n${item.subtitle}\n${item.description}`)
            .join('\n\n'),
        } as TextContent;
      }
      if (fromType === 'list') {
        const listData = data as ListItem[];
        return {
          content: listData.map((item) => item.content).join('\n'),
        } as TextContent;
      }
    }

    // Text -> Timeline/List
    if (fromType === 'text') {
      const textData = data as TextContent;
      const content = textData.content || '';
      if (toType === 'timeline') {
        return [
          {
            id: Date.now().toString(),
            title: '标题',
            subtitle: '',
            secondarySubtitle: '',
            startDate: '',
            endDate: '',
            description: content,
          },
        ];
      }
      if (toType === 'list') {
        return content.split('\n').map((line, index) => ({
          id: (Date.now() + index).toString(),
          content: line,
        }));
      }
    }

    return data;
  };

  // 更新编辑器类型并转换数据
  const updateEditorType = (sectionId: string, newEditorType: 'timeline' | 'list' | 'text') => {
    const section = getSection(sectionId);
    if (!section) return;

    const currentEditorType = getEditorType(section);
    const convertedData = convertDataForEditorType(
      section.data as TimelineItem[] | ListItem[] | TextContent,
      currentEditorType,
      newEditorType
    );

    // 先更新编辑器类型
    updateSectionEditorType(sectionId, newEditorType);

    // 再更新转换后的数据
    updateSection(sectionId, convertedData);
  };

  // 重新分配order的辅助函数
  const reorderSections = (newManagedSections: ResumeSection[]) => {
    // 重新分配order
    const updatedManagedSections = newManagedSections.map((section, index) => ({
      ...section,
      order: index + 2, // 基本信息的order是1，所以其他模块从2开始
    }));

    updateSectionsOrder(updatedManagedSections);
  };

  // 上移模块
  const moveUp = (sectionId: string) => {
    const currentIndex = managedSections.findIndex((s) => s.id === sectionId);
    if (currentIndex <= 0) return;

    const newSections = [...managedSections];
    [newSections[currentIndex - 1], newSections[currentIndex]] = [
      newSections[currentIndex],
      newSections[currentIndex - 1],
    ];

    reorderSections(newSections);
  };

  // 下移模块
  const moveDown = (sectionId: string) => {
    const currentIndex = managedSections.findIndex((s) => s.id === sectionId);
    if (currentIndex >= managedSections.length - 1) return;

    const newSections = [...managedSections];
    [newSections[currentIndex], newSections[currentIndex + 1]] = [
      newSections[currentIndex + 1],
      newSections[currentIndex],
    ];

    reorderSections(newSections);
  };

  // 拖拽结束处理
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = managedSections.findIndex((section) => section.id === active.id);
    const newIndex = managedSections.findIndex((section) => section.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const newSections = arrayMove(managedSections, oldIndex, newIndex);
      reorderSections(newSections);
    }
  };

  // 切换可见性 - 直接调用状态管理
  const toggleVisibility = (sectionId: string) => {
    toggleSectionVisibility(sectionId);
  };

  // 删除模块 - 直接调用状态管理
  const deleteSection = (sectionId: string) => {
    deleteSectionFromStore(sectionId);
  };

  // 编辑相关函数
  const startEditing = (section: ResumeSection) => {
    setEditingId(section.id);
    setEditingTitle(section.title);
  };

  const saveEditing = () => {
    if (editingId && editingTitle.trim()) {
      updateSectionTitle(editingId, editingTitle.trim());
      setEditingId(null);
      setEditingTitle('');
    }
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingTitle('');
  };

  const handleUpdateSectionIcon = (sectionId: string, iconName: string) => {
    updateSectionIcon(sectionId, iconName);
  };

  // 添加自定义模块
  const addCustomSection = () => {
    const newSection: ResumeSection = {
      id: `custom-${Date.now()}`,
      title: '新模块',
      iconName: 'star',
      type: 'timeline',
      editorType: 'timeline',
      visible: true,
      order: managedSections.length + 2, // 基本信息order为1
      data: [],
    };

    addSection(newSection);
    startEditing(newSection);
  };

  // 拖拽上下文配置
  const dragConfig = {
    sensors,
    onDragEnd: handleDragEnd,
    sortableItems: managedSections.map((s) => s.id),
    strategy: verticalListSortingStrategy,
  };

  return {
    // 数据
    managedSections,
    editingId,
    editingTitle,
    showIconSelector,

    // 编辑状态更新
    setEditingTitle,
    setShowIconSelector,

    // 业务操作
    deleteSection,
    addCustomSection,
    startEditing,
    saveEditing,
    cancelEditing,
    updateSectionIcon: handleUpdateSectionIcon,
    getEditorType,
    updateEditorType,
    toggleVisibility,
    moveUp,
    moveDown,

    // 拖拽相关
    dragConfig,
    handleDragEnd,
  };
};
