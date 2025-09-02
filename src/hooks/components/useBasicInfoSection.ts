/**
 * 基本信息组件业务逻辑 Hook
 */
import type { BasicInfo } from '@/types/resume';
import { useState } from 'react';

export const useBasicInfoSection = (
  initialData: BasicInfo,
  onUpdate: (data: BasicInfo) => void
) => {
  const [isEditing, setIsEditing] = useState(false);

  // 开始编辑
  const startEditing = () => {
    setIsEditing(true);
  };

  // 关闭编辑
  const closeEditing = () => {
    setIsEditing(false);
  };

  // 保存数据
  const handleSave = (newData: BasicInfo) => {
    onUpdate(newData);
    setIsEditing(false);
  };

  // 格式化性别和年龄显示
  const formatGenderAge = (gender?: string, age?: string) => {
    if (gender && age) {
      return `${gender} | ${age}岁`;
    }
    return gender || (age ? `${age}岁` : '');
  };

  // 格式化自定义字段显示
  const formatCustomFields = (customFields?: { id: string; label: string; value: string }[]) => {
    if (!customFields || customFields.length === 0) return '';

    return customFields.map((field) => `${field.label} | ${field.value}`).join(' | ');
  };

  // 检查字段是否有值
  const hasValue = (value?: string) => {
    return value && value.trim() !== '';
  };

  return {
    // 状态
    isEditing,

    // 操作方法
    startEditing,
    closeEditing,
    handleSave,

    // 格式化方法
    formatGenderAge,
    formatCustomFields,
    hasValue,
  };
};
