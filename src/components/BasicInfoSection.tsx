/**
 * 基本信息区域 - 简约风格
 */

import { useState } from 'react';
import { Edit3, Mail, Phone, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BasicInfoEditorContainer } from '@/containers/BasicInfoEditorContainer';
import type { BasicInfo, ResumeSection } from '@/types/resume';

interface BasicInfoSectionProps {
  section: ResumeSection;
  isEditable: boolean;
  onUpdate: (data: BasicInfo) => void;
}

export const BasicInfoSection = ({ section, isEditable, onUpdate }: BasicInfoSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const data = section.data as BasicInfo;

  return (
    <>
      {/* 简约风格头部区域 */}
      <div className="relative group px-8 pt-8 pb-6 print:px-6 print:pt-6 print:pb-4">
        {/* 编辑按钮 */}
        {isEditable && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-100 h-8 w-8 print:hidden z-20"
            onClick={() => {
              setIsEditing(true);
            }}
          >
            <Edit3 className="h-4 w-4 text-gray-600" />
          </Button>
        )}

        {/* 头部布局：左侧信息 + 右侧头像 */}
        <div className="flex items-start justify-between">
          {/* 左侧：姓名和基本信息 */}
          <div className="flex-1 pr-6">
            {/* 姓名 */}
            <h1 className="text-4xl font-bold text-gray-900 mb-3 print:text-3xl print:mb-2">
              {data.name || '姓名'}
            </h1>

            {/* 基本信息行 */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600 print:text-xs print:gap-x-4">
              {/* 性别和年龄 */}
              {(data.gender || data.age) && (
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4 print:h-3 print:w-3" />
                  <span>
                    {data.gender && data.age
                      ? `${data.gender} | ${data.age}岁`
                      : data.gender || `${data.age}岁`}
                  </span>
                </div>
              )}

              {/* 电话 */}
              {data.phone && (
                <div className="flex items-center space-x-1">
                  <Phone className="h-4 w-4 print:h-3 print:w-3" />
                  <span>{data.phone}</span>
                </div>
              )}

              {/* 邮箱 */}
              {data.email && (
                <div className="flex items-center space-x-1">
                  <Mail className="h-4 w-4 print:h-3 print:w-3" />
                  <span>{data.email}</span>
                </div>
              )}
            </div>

            {/* 第二行：工作经验、求职意向、期望城市 */}
            <div className="text-sm text-gray-600 mt-2 print:text-xs print:mt-1">
              {/* 工作经验和求职意向信息 */}
              {data.customFields && data.customFields.length > 0 && (
                <span>
                  {data.customFields.map((field, index) => (
                    <span key={field.id}>
                      {field.label} | {field.value}
                      {index < data.customFields!.length - 1 && ' | '}
                    </span>
                  ))}
                </span>
              )}
            </div>
          </div>

          {/* 右侧：头像 */}
          <div className="shrink-0">
            <div className="w-24 h-32 print:w-20 print:h-28 rounded-lg overflow-hidden bg-gray-200 border border-gray-300">
              {data.avatar ? (
                <img
                  src={data.avatar}
                  alt={data.name || '头像'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="h-8 w-8 text-gray-400 print:h-6 print:w-6" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 编辑器 */}
      {isEditing && (
        <BasicInfoEditorContainer
          isOpen={true}
          onClose={() => setIsEditing(false)}
          initialData={data}
          onSave={(newData) => {
            onUpdate(newData);
          }}
        />
      )}
    </>
  );
};
