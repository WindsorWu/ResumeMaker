/**
 * 可复用的图标选择器区域组件
 */
import { Label } from '@/components/ui/label';
import { getIconByName } from '@/config/icons';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { IconSelector } from './IconSelector';

interface IconSelectorSectionProps {
  selectedIcon: string;
  isOpen: boolean;
  onToggle: () => void;
  onIconSelect: (iconName: string) => void;
}

export const IconSelectorSection = ({
  selectedIcon,
  isOpen,
  onToggle,
  onIconSelect,
}: IconSelectorSectionProps) => {
  const IconComponent = getIconByName(selectedIcon);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
      <div
        className="p-4 cursor-pointer flex items-center justify-between hover:bg-blue-100/50 transition-colors rounded-lg"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-3">
          <div className="p-1.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-md">
            {IconComponent && <IconComponent className="h-4 w-4 text-white" />}
          </div>
          <Label className="text-sm font-medium text-gray-700 cursor-pointer">
            模块图标 (当前: {selectedIcon})
          </Label>
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </div>

      {isOpen && (
        <div className="px-4 pb-4 border-t border-blue-200/50 mt-2 pt-4">
          <IconSelector selectedIcon={selectedIcon} onIconSelect={onIconSelect} />
        </div>
      )}
    </div>
  );
};
