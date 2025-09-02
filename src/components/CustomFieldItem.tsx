/**
 * 自定义字段项组件 - 简洁版本
 */
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useCustomFieldItem } from '@/hooks/components/useCustomFieldItem';
import type { CustomField } from '@/types/resume';
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { FormField } from './FormField';
import { IconSelector } from './IconSelector';

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
  const {
    iconComponent: IconComponent,
    displayName,
    updateLabel,
    updateValue,
    updateIcon,
  } = useCustomFieldItem(field, onUpdate);

  return (
    <div className="border border-gray-200 rounded-lg p-3 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-1 bg-indigo-100 rounded">{IconComponent && IconComponent}</div>
          <span className="text-sm font-medium">{displayName}</span>
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
              onChange={updateLabel}
            />
            <FormField
              id={`${field.id}-value`}
              label="字段值"
              value={field.value}
              placeholder="请输入对应的值"
              onChange={updateValue}
            />
          </div>
          <div className="space-y-2">
            <Label>图标</Label>
            <IconSelector selectedIcon={field.iconName} onIconSelect={updateIcon} />
          </div>
        </div>
      )}
    </div>
  );
};
