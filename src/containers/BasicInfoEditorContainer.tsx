import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AvatarUpload } from "@/components/AvatarUpload";
import { FormField } from "@/components/FormField";
import { CustomFieldItem } from "@/components/CustomFieldItem";
import { useAutoSaveDialog } from "@/hooks/useAutoSaveDialog";
import { useState } from "react";
import type { BasicInfo, CustomField } from "@/types/resume";

interface BasicInfoEditorContainerProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: BasicInfo;
  onSave: (data: BasicInfo) => void;
}

export const BasicInfoEditorContainer = ({
  isOpen,
  onClose,
  initialData,
  onSave,
}: BasicInfoEditorContainerProps) => {
  // 使用通用的自动保存对话框 Hook
  const { data: formData, setData: setFormData, handleClose, saveStatusText } = useAutoSaveDialog<BasicInfo>({
    isOpen,
    initialData: { ...initialData, customFields: initialData.customFields || [] },
    onSave,
    onClose,
    debounceDelay: 300
  })

  const [expandedCustomField, setExpandedCustomField] = useState<string | null>(null)

  const handleChange = (field: keyof BasicInfo, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAvatarChange = (avatar: string) => {
    setFormData(prev => ({
      ...prev,
      avatar,
    }))
  }

  const addCustomField = () => {
    const newField: CustomField = {
      id: Date.now().toString(),
      label: '',
      value: '',
      icon: 'star',
      iconName: 'star'
    }
    setFormData(prev => ({
      ...prev,
      customFields: [...(prev.customFields || []), newField]
    }))
    setExpandedCustomField(newField.id)
  }

  const updateCustomField = (id: string, updates: Partial<CustomField>) => {
    setFormData(prev => ({
      ...prev,
      customFields: prev.customFields?.map(field => 
        field.id === id ? { ...field, ...updates } : field
      ) || []
    }))
  }

  const removeCustomField = (id: string) => {
    setFormData(prev => ({
      ...prev,
      customFields: prev.customFields?.filter(field => field.id !== id) || []
    }))
    if (expandedCustomField === id) {
      setExpandedCustomField(null)
    }
  }

  const toggleCustomFieldExpansion = (id: string) => {
    setExpandedCustomField(expandedCustomField === id ? null : id)
  }

  const basicFields = [
    { id: "name", label: "姓名", type: "text", placeholder: "请输入姓名" },
    {
      id: "email",
      label: "邮箱",
      type: "email",
      placeholder: "请输入邮箱地址",
    },
    { id: "phone", label: "电话", type: "tel", placeholder: "请输入电话号码" },
    {
      id: "location",
      label: "地址",
      type: "text",
      placeholder: "请输入所在地址",
    },
    {
      id: "website",
      label: "网站",
      type: "url",
      placeholder: "请输入个人网站或社交媒体链接",
    },
    { id: "gender", label: "性别", type: "text", placeholder: "请输入性别" },
    { id: "age", label: "年龄", type: "text", placeholder: "请输入年龄" },
  ] as const;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogTitle className="sr-only">编辑基本信息</DialogTitle>
        <DialogDescription className="sr-only">
          编辑个人基本信息，包括姓名、联系方式等，所有更改将自动保存。状态：{saveStatusText}
        </DialogDescription>
        <div className="space-y-6">
          {/* 头像上传 */}
          <div className="space-y-2">
            <Label>头像</Label>
            <AvatarUpload
              currentAvatar={formData.avatar}
              onAvatarChange={handleAvatarChange}
            />
          </div>

          {/* 基本信息表单 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {basicFields.map((field) => (
              <FormField
                key={field.id}
                id={field.id}
                label={field.label}
                type={field.type}
                value={
                  (formData[field.id as keyof BasicInfo] as string) || ""
                }
                placeholder={field.placeholder}
                onChange={(value) =>
                  handleChange(field.id as keyof BasicInfo, value)
                }
              />
            ))}
          </div>

          {/* 自定义字段 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">自定义字段</Label>
              <Button
                onClick={addCustomField}
                size="sm"
                className="flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>添加字段</span>
              </Button>
            </div>

            {formData.customFields && formData.customFields.length > 0 && (
              <div className="space-y-3">
                {formData.customFields.map((field) => (
                  <CustomFieldItem
                    key={field.id}
                    field={field}
                    isExpanded={expandedCustomField === field.id}
                    onToggleExpansion={() =>
                      toggleCustomFieldExpansion(field.id)
                    }
                    onUpdate={(updates) => updateCustomField(field.id, updates)}
                    onRemove={() => removeCustomField(field.id)}
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
