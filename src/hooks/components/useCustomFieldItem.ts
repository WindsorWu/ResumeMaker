/**
 * 自定义字段项业务逻辑 Hook
 */
import { getIconByName } from '@/config/icons';
import type { CustomField } from '@/types/resume';

export const useCustomFieldItem = (
  field: CustomField,
  onUpdate: (updates: Partial<CustomField>) => void
) => {
  // 获取图标组件
  const getIconComponent = () => {
    return getIconByName(field.iconName);
  };

  // 获取显示名称
  const getDisplayName = () => {
    return field.label || '未命名字段';
  };

  // 更新字段标签
  const updateLabel = (label: string) => {
    onUpdate({ label });
  };

  // 更新字段值
  const updateValue = (value: string) => {
    onUpdate({ value });
  };

  // 更新图标
  const updateIcon = (iconName: string) => {
    onUpdate({
      iconName,
      icon: iconName,
    });
  };

  return {
    // 计算属性
    iconComponent: getIconComponent(),
    displayName: getDisplayName(),

    // 操作方法
    updateLabel,
    updateValue,
    updateIcon,
  };
};
