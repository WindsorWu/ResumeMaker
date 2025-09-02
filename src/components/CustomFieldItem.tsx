import { Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FormField } from './FormField';
import { IconSelector } from './IconSelector';
import { getIconByName } from '@/config/icons';
import type { CustomField } from '@/types/resume';

interface CustomFieldItemProps {
  field: CustomField;
  isExpanded: boolean;
  onToggleExpansion: () => void;
  onUpdate: (updates: Partial<CustomField>) => void;
  onRemove: () => void;
}

export const CustomFieldItem = ({
  field,
  isExpanded,
  onToggleExpansion,
  onUpdate,
  onRemove,
}: CustomFieldItemProps) => {
  const IconComponent = getIconByName(field.iconName);

  return (
    <div className="border border-gray-200 rounded-lg p-3 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-1 bg-indigo-100 rounded">
            {IconComponent && <IconComponent className="h-4 w-4 text-indigo-600" />}
          </div>
          <span className="text-sm font-medium">{field.label || '未命名字段'}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" onClick={onToggleExpansion} className="h-6 w-6">
            {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onRemove}
            className="h-6 w-6 text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-3 pt-3 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormField
              id={`${field.id}-label`}
              label="字段名称"
              value={field.label}
              placeholder="例如：GitHub、LinkedIn"
              onChange={(value) => onUpdate({ label: value })}
            />
            <FormField
              id={`${field.id}-value`}
              label="字段值"
              value={field.value}
              placeholder="请输入对应的值"
              onChange={(value) => onUpdate({ value })}
            />
          </div>
          <div className="space-y-2">
            <Label>图标</Label>
            <IconSelector
              selectedIcon={field.iconName}
              onIconSelect={(iconName) =>
                onUpdate({
                  iconName,
                  icon: iconName,
                })
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};
