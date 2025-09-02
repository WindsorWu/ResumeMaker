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

// 获取所有可用图标名称（用于搜索和提示）
export const getAllIconNames = (): string[] => {
  const iconRecord = LucideIcons as Record<string, unknown>;
  return Object.keys(iconRecord)
    .filter(
      (key) => typeof iconRecord[key] === 'function' && key !== 'createLucideIcon' && key !== 'Icon'
    )
    .map((componentName) =>
      componentName
        .replace(/([A-Z])/g, '-$1')
        .toLowerCase()
        .slice(1)
    )
    .sort();
};

// 搜索图标名称
export const searchIconNames = (searchTerm: string): string[] => {
  const allNames = getAllIconNames();
  if (!searchTerm) return allNames;

  const lowerSearchTerm = searchTerm.toLowerCase();
  return allNames.filter((name) => name.toLowerCase().includes(lowerSearchTerm));
};
