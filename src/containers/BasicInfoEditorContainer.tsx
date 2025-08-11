import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { AvatarUpload } from "@/components/AvatarUpload";
import { FormField } from "@/components/FormField";
import { CustomFieldItem } from "@/components/CustomFieldItem";
import { useBasicInfoEditor } from "@/hooks/useBasicInfoEditor";
import type { BasicInfo } from "@/types/resume";

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
  const {
    formData,
    expandedCustomField,
    handleChange,
    handleAvatarChange,
    addCustomField,
    updateCustomField,
    removeCustomField,
    toggleCustomFieldExpansion,
  } = useBasicInfoEditor(initialData, onSave);

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogTitle className="sr-only">编辑基本信息</DialogTitle>
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
              <>
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
              </>
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
