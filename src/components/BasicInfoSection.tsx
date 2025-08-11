/**
 * 左侧基本信息
 */

import { useState } from "react";
import {
  Edit3,
  Mail,
  Phone,
  MapPin,
  Globe,
  User,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BasicInfoEditorContainer } from "@/containers/BasicInfoEditorContainer";
import { AvatarDisplay } from "./AvatarDisplay";
import { ContactInfoItem } from "./ContactInfoItem";
import { getIconByName } from "@/config/icons";
import type { BasicInfo, ResumeSection } from "@/types/resume";

interface BasicInfoSectionProps {
  section: ResumeSection;
  isTopBottomLayout: boolean;
  isEditable: boolean;
  onUpdate: (data: BasicInfo) => void;
}

export const BasicInfoSection = ({
  section,
  isTopBottomLayout,
  isEditable,
  onUpdate,
}: BasicInfoSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const data = section.data as BasicInfo;

  // 联系信息配置
  const contactInfos = [
    { key: "email", icon: Mail, value: data.email, bgColor: "bg-blue-500" },
    { key: "phone", icon: Phone, value: data.phone, bgColor: "bg-green-500" },
    {
      key: "location",
      icon: MapPin,
      value: data.location,
      bgColor: "bg-red-500",
    },
    {
      key: "website",
      icon: Globe,
      value: data.website,
      bgColor: "bg-purple-500",
    },
    {
      key: "gender",
      label: "性别",
      value: data.gender,
      icon: User,
      bgColor: "bg-pink-500",
    },
    {
      key: "age",
      label: "年龄",
      value: data.age,
      icon: Calendar,
      bgColor: "bg-orange-500",
    },
  ].filter((info) => info.value) as Array<{
    key: string;
    icon: typeof Mail;
    value: string;
    bgColor: string;
  }>; // 过滤后确保value不为undefined

  return (
    <>
      <div
        className={`relative group ${
          isTopBottomLayout
            ? "bg-white rounded-lg p-6 shadow-sm print:shadow-none print:p-4 print:border-b print:border-gray-300 print:rounded-none print:pb-6"
            : "print:border-r print:border-gray-300 print:pr-4"
        }`}
      >
        {/* 编辑按钮 */}
        {isEditable && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-blue-100/50 h-8 w-8 print:hidden z-20"
            onClick={() => {
              setIsEditing(true);
              console.log("isEditing", isEditing);
            }}
          >
            <Edit3 className="h-3 w-3 text-blue-600" />
          </Button>
        )}

        <div
          className={`${
            isTopBottomLayout
              ? "flex items-center space-x-6 print:space-x-4"
              : "flex flex-col h-full min-h-0"
          }`}
        >
          {/* 头像和姓名区域 */}
          <AvatarDisplay
            avatar={data.avatar}
            name={data.name}
            isTopBottomLayout={isTopBottomLayout}
          />

          {/* 基本信息内容 */}
          <div
            className={`${
              isTopBottomLayout
                ? "flex-1 min-w-0"
                : "flex-1 flex flex-col min-h-0"
            }`}
          >
            {isTopBottomLayout && (
              <h1 className="text-3xl font-bold text-gray-800 mb-2 print:text-2xl print:mb-1">
                {data.name || "姓名"}
              </h1>
            )}

            {/* 联系信息 + 自定义字段 */}
            <div
              className={`${
                isTopBottomLayout
                  ? "grid grid-cols-1 md:grid-cols-2 gap-3 print:gap-2 print:grid-cols-2"
                  : "space-y-3 print:space-y-2 flex-1"
              }`}
            >
              {/* 基本联系信息 */}
              {contactInfos.map((info) => (
                <ContactInfoItem
                  key={info.key}
                  icon={info.icon}
                  value={info.value}
                  bgColor={info.bgColor}
                  isTopBottomLayout={isTopBottomLayout}
                />
              ))}

              {data.customFields &&
                data.customFields.map((field) => {
                  const IconComponent = getIconByName(field.iconName);
                  return (
                    <ContactInfoItem
                      key={field.id}
                      icon={IconComponent || User}
                      value={`${field.label} ${field.value}`}
                      bgColor="bg-indigo-500"
                      isTopBottomLayout={isTopBottomLayout}
                    />
                  );
                })}
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
