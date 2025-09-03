/**
 * 图标相关工具函数
 */
import * as LucideIcons from 'lucide-react';

// 图标名称转换函数：将kebab-case转换为PascalCase
export const iconNameToComponentName = (name: string): string => {
  return name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
};

// 验证图标是否存在的工具函数
export const isValidIconName = (name: string): boolean => {
  if (!name) return false;
  const componentName = iconNameToComponentName(name);
  const iconRecord = LucideIcons as Record<string, unknown>;
  return !!iconRecord[componentName];
};
