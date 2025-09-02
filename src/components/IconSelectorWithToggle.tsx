/**
 * 带开关功能的图标选择器组件
 */
import { useIconSelector } from '@/hooks/components/useIconSelector';
import { IconSelector } from './IconSelector';

interface IconSelectorWithToggleProps {
  selectedIcon?: string;
  onIconSelect: (iconName: string) => void;
  onIconToggle: (enabled: boolean) => void;
  initialEnabled?: boolean;
  label?: string;
}

export const IconSelectorWithToggle = ({
  selectedIcon,
  onIconSelect,
  onIconToggle,
  initialEnabled = false,
  label = '模块图标',
}: IconSelectorWithToggleProps) => {
  const { isIconEnabled, toggleIconEnabled } = useIconSelector(initialEnabled);

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 阻止事件冒泡，防止意外关闭Dialog
    e.stopPropagation();

    const newState = !isIconEnabled;
    toggleIconEnabled();
    onIconToggle(newState);

    // 如果禁用图标，清空选中的图标
    if (!newState) {
      onIconSelect('');
    }
  };

  const handleIconSelect = (iconName: string) => {
    onIconSelect(iconName);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="icon-toggle"
          checked={isIconEnabled}
          onChange={handleToggle}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
        <label
          htmlFor="icon-toggle"
          className="text-sm font-medium text-gray-700 cursor-pointer"
          onClick={(e) => e.stopPropagation()} // 防止label点击触发Dialog关闭
        >
          显示{label}
        </label>
      </div>

      {isIconEnabled && (
        <div className="pl-6 border-l-2 border-blue-100">
          <IconSelector
            selectedIcon={selectedIcon || 'briefcase'}
            onIconSelect={handleIconSelect}
          />
        </div>
      )}
    </div>
  );
};
