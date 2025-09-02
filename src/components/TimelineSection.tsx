/**
 * 时间线展示区域 - 简洁版本
 */
import { ListEditor, TextEditor, TimelineEditor } from '@/components/editors';
import { Button } from '@/components/ui/button';
import { useTimelineSection } from '@/hooks/components/useTimelineSection';
import type { ListItem, ResumeSection, TextContent, TimelineItem } from '@/types/resume';
import { Edit3 } from 'lucide-react';
import { DynamicIcon } from 'lucide-react/dynamic';
import { ListContent, TextContentRenderer, TimelineContent } from './ContentRenderer';

interface TimelineSectionProps {
  section: ResumeSection;
  isEditable?: boolean;
  onUpdate: (data: TimelineItem[] | ListItem[] | TextContent, iconName?: string) => void;
}

export const TimelineSection = ({ section, isEditable, onUpdate }: TimelineSectionProps) => {
  const { isEditing, editorType, startEditing, getEditorProps } = useTimelineSection(
    section,
    onUpdate
  );

  // 渲染内容
  const renderContent = () => {
    if (editorType === 'list') {
      return <ListContent data={section.data as ListItem[]} />;
    } else if (editorType === 'text') {
      return <TextContentRenderer data={section.data as TextContent} />;
    } else {
      return <TimelineContent data={section.data as TimelineItem[]} />;
    }
  };

  // 渲染编辑器
  const renderEditor = () => {
    const editorProps = getEditorProps();

    if (editorType === 'list') {
      return <ListEditor {...editorProps} initialData={editorProps.initialData as ListItem[]} />;
    } else if (editorType === 'text') {
      return <TextEditor {...editorProps} initialData={editorProps.initialData as TextContent} />;
    } else {
      return (
        <TimelineEditor {...editorProps} initialData={editorProps.initialData as TimelineItem[]} />
      );
    }
  };

  return (
    <>
      {/* 模块内容 */}
      <div className="relative group">
        {/* 编辑按钮 */}
        {isEditable && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-100 h-8 w-8 print:hidden z-10"
            onClick={startEditing}
          >
            <Edit3 className="h-4 w-4 text-gray-600" />
          </Button>
        )}

        {/* 模块标题 */}
        <div className="flex items-center mb-4 print:mb-3">
          <h2 className="text-xl font-bold text-gray-900 print:text-lg">{section.title}</h2>
          {/* 图标 */}
          {section.iconName && (
            <div className="p-2 ">
              <DynamicIcon name={section.iconName} className="h-4 w-4 print:h-3 print:w-3" />
            </div>
          )}
        </div>

        {/* 内容区域 */}
        <div className={section.iconName ? 'ml-6 print:ml-3' : ''}>{renderContent()}</div>
      </div>

      {/* 编辑器 */}
      {isEditing && renderEditor()}
    </>
  );
};
