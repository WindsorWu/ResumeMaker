/**
 * 文本编辑器业务逻辑 Hook
 */
import type { TextContent } from '@/types/resume';
import { useMemo, useState } from 'react';

export const useTextEditor = (
  isOpen: boolean,
  initialData: TextContent,
  currentIcon: string,
  onSave: (data: TextContent, iconName?: string) => void,
  onClose: () => void
) => {
  const [content, setContent] = useState(initialData.content);
  const [selectedIcon, setSelectedIcon] = useState(currentIcon);
  const [iconEnabled, setIconEnabled] = useState(!!currentIcon && currentIcon !== '');

  // 重置编辑器状态
  const resetEditor = () => {
    setContent(initialData.content);
    setSelectedIcon(currentIcon);
    setIconEnabled(!!currentIcon && currentIcon !== '');
  };

  // 监听打开状态，重置编辑器
  useState(() => {
    if (isOpen) {
      resetEditor();
    }
  });

  // 计算字数和行数
  const { wordCount, lineCount } = useMemo(() => {
    const wordCount = content.length;
    const lineCount = content.split('\n').length;
    return { wordCount, lineCount };
  }, [content]);

  // 图标开关切换
  const toggleIcon = (enabled: boolean) => {
    setIconEnabled(enabled);
  };

  // 保存
  const handleSave = () => {
    onSave({ content }, iconEnabled ? selectedIcon : '');
  };

  // 取消
  const handleCancel = () => {
    const hasChanges =
      content !== initialData.content ||
      selectedIcon !== currentIcon ||
      iconEnabled !== (!!currentIcon && currentIcon !== '');

    if (hasChanges) {
      const confirmed = window.confirm('有未保存的更改，确定要取消吗？');
      if (!confirmed) return;
    }
    resetEditor();
    onClose();
  };

  return {
    // 状态
    content,
    selectedIcon,
    iconEnabled,
    wordCount,
    lineCount,

    // 操作方法
    setContent,
    setSelectedIcon,
    toggleIcon,
    handleSave,
    handleCancel,
    resetEditor,
  };
};
