/**
 * 基础信息编辑器 - 自动保存版本
 */
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useAutoSaveDialog } from '@/hooks/useAutoSaveDialog';
import type { BasicInfo, CustomField } from '@/types/resume';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { AvatarUpload } from '../avatar/AvatarUpload';
import { BasicInfoCustomFieldItem } from './BasicInfoCustomFieldItem';
import { BasicInfoFieldItem } from './BasicInfoFieldItem';

interface BasicInfoEditorProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: BasicInfo;
  onSave: (data: BasicInfo) => void;
}

export const BasicInfoEditor = ({ isOpen, onClose, initialData, onSave }: BasicInfoEditorProps) => {
  // 使用通用的自动保存对话框 Hook
  const {
    data: formData,
    setData: setFormData,
    handleClose,
    saveStatusText,
  } = useAutoSaveDialog<BasicInfo>({
    isOpen,
    initialData: { ...initialData, customFields: initialData.customFields || [] },
    onSave,
    onClose,
    debounceDelay: 300,
  });

  const [expandedCustomField, setExpandedCustomField] = useState<string | null>(null);

  const handleChange = (field: keyof BasicInfo, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAvatarChange = (avatar: string) => {
    setFormData((prev) => ({
      ...prev,
      avatar,
    }));
  };

  const addCustomField = () => {
    const newField: CustomField = {
      id: Date.now().toString(),
      label: '',
      value: '',
      icon: 'star',
      iconName: 'star',
    };
    setFormData((prev) => ({
      ...prev,
      customFields: [...(prev.customFields || []), newField],
    }));
    setExpandedCustomField(newField.id);
  };

  const updateCustomField = (id: string, updates: Partial<CustomField>) => {
    setFormData((prev) => ({
      ...prev,
      customFields:
        prev.customFields?.map((field) => (field.id === id ? { ...field, ...updates } : field)) ||
        [],
    }));
  };

  const removeCustomField = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      customFields: prev.customFields?.filter((field) => field.id !== id) || [],
    }));
    if (expandedCustomField === id) {
      setExpandedCustomField(null);
    }
  };

  const basicFields = [
    { id: 'name', label: '姓名', type: 'text', placeholder: '请输入您的姓名' },
    { id: 'gender', label: '性别', type: 'text', placeholder: '请输入您的性别' },
    { id: 'age', label: '年龄', type: 'text', placeholder: '请输入您的年龄' },
    { id: 'phone', label: '电话', type: 'tel', placeholder: '+86 138 0013 8000' },
    { id: 'email', label: '邮箱', type: 'email', placeholder: 'your.email@example.com' },
  ] as const;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogTitle className="text-xl font-semibold text-gray-800 flex items-center space-x-3">
          <span>编辑基本信息</span>
          <span className="text-sm font-normal text-gray-500 ml-auto">{saveStatusText}</span>
        </DialogTitle>
        <DialogDescription>
          编辑个人基本信息，包括姓名、联系方式等，所有更改将自动保存。
        </DialogDescription>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>头像</Label>
            <AvatarUpload currentAvatar={formData.avatar} onAvatarChange={handleAvatarChange} />
          </div>

          {/* 基本信息表单 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {basicFields.map((field) => (
              <BasicInfoFieldItem
                key={field.id}
                id={field.id}
                label={field.label}
                type={field.type}
                value={(formData[field.id as keyof BasicInfo] as string) || ''}
                placeholder={field.placeholder}
                onChange={(value) => handleChange(field.id as keyof BasicInfo, value)}
              />
            ))}
          </div>

          {/* 自定义字段 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>自定义字段</Label>
              <Button onClick={addCustomField} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                添加字段
              </Button>
            </div>

            {formData.customFields && formData.customFields.length > 0 && (
              <div className="space-y-3">
                {formData.customFields.map((field) => (
                  <BasicInfoCustomFieldItem
                    key={field.id}
                    field={field}
                    onUpdate={(fieldId, updates) => updateCustomField(fieldId, updates)}
                    onDelete={(fieldId) => removeCustomField(fieldId)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
