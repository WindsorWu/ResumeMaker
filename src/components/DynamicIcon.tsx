/**
 * 动态图标组件 - 支持通过名称动态加载 Lucide 图标
 * 使用方式：<DynamicIcon name="heart" className="h-6 w-6" />
 */
import * as LucideIcons from 'lucide-react';
import { memo } from 'react';

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

// 图标名称转换函数：将kebab-case转换为PascalCase
const iconNameToComponentName = (name: string): string => {
  return name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
};

export const DynamicIcon = memo(({ name, className = 'h-4 w-4', size }: DynamicIconProps) => {
  if (!name) {
    const DefaultIcon = LucideIcons.HelpCircle;
    return <DefaultIcon className={className} size={size} />;
  }

  const componentName = iconNameToComponentName(name);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (LucideIcons as any)[componentName];

  if (!IconComponent || typeof IconComponent !== 'function') {
    // 如果图标不存在，显示一个默认的占位符
    const DefaultIcon = LucideIcons.HelpCircle;
    return <DefaultIcon className={className} size={size} />;
  }

  return <IconComponent className={className} size={size} />;
});

DynamicIcon.displayName = 'DynamicIcon';
