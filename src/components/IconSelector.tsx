/**
 * 图标选择器组件 - 简化版本
 */
import { SimpleIconInput } from './SimpleIconInput';

interface IconSelectorProps {
  selectedIcon: string;
  onIconSelect: (iconName: string) => void;
}

export const IconSelector = ({ selectedIcon, onIconSelect }: IconSelectorProps) => {
  return (
    <SimpleIconInput
      value={selectedIcon}
      onChange={onIconSelect}
      placeholder="输入图标名称，如 heart, star, user..."
    />
  );
};
