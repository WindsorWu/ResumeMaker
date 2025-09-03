import type { LucideIcon } from 'lucide-react';

export interface IconOption {
  name: string;
  icon: LucideIcon;
}

// 常用图标名称的类型定义
export type CommonIconName =
  | 'star'
  | 'heart'
  | 'user'
  | 'mail'
  | 'phone'
  | 'map-pin'
  | 'briefcase'
  | 'graduation-cap'
  | 'award'
  | 'code'
  | 'settings'
  | 'edit'
  | 'trash-2'
  | 'plus'
  | 'chevron-up'
  | 'chevron-down'
  | 'calendar'
  | 'list'
  | 'type'
  | 'grip-vertical'
  | 'check'
  | 'x';

// 类型保护函数，用于安全地将字符串转换为图标名称
export const asIconName = (name: string): CommonIconName => {
  // 这里使用类型断言，但在实际使用中应该结合 isValidIconName 验证
  return name as CommonIconName;
};
