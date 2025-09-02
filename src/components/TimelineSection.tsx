import { useState } from 'react';
import { Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TimelineEditor } from './TimelineEditor';
import { ListEditor } from './ListEditor';
import { TextEditor } from './TextEditor';
import type { TimelineItem, ListItem, TextContent, ResumeSection } from '@/types/resume';

interface TimelineSectionProps {
  section: ResumeSection;
  isEditable: boolean;
  onUpdate: (data: TimelineItem[] | ListItem[] | TextContent, iconName?: string) => void;
}

export const TimelineSection = ({ section, isEditable, onUpdate }: TimelineSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);

  // 根据编辑器类型获取对应的数据
  const getEditorType = () => section.editorType || 'timeline';
  const editorType = getEditorType();

  // 渲染列表内容
  const renderListContent = (data: ListItem[]) => (
    <div className="space-y-3 print:space-y-2">
      {data.map((item, index) => (
        <div key={item.id} className="flex items-start space-x-3">
          <span className="text-sm font-medium text-blue-600 print:text-xs mt-0.5 shrink-0">
            {index + 1}.
          </span>
          <div className="text-sm text-gray-700 leading-relaxed print:text-xs">{item.content}</div>
        </div>
      ))}
    </div>
  );

  // 渲染时间线内容
  const renderTimelineContent = (data: TimelineItem[]) => (
    <div className="space-y-4 print:space-y-3">
      {data.map((item) => (
        <div key={item.id} className="relative">
          <div className="flex justify-between items-start mb-2 print:mb-1">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-1 print:mb-0.5">
                <h3 className="text-base font-semibold text-gray-900 print:text-sm">
                  {item.secondarySubtitle}
                </h3>
                <span className="text-sm text-gray-600 print:text-xs">{item.subtitle}</span>
              </div>
              {item.title && (
                <div className="text-sm text-gray-700 print:text-xs font-medium">{item.title}</div>
              )}
            </div>
            {(item.startDate || item.endDate) && (
              <div className="text-sm text-gray-600 print:text-xs ml-4 shrink-0">
                {item.startDate} {item.startDate && item.endDate && '-'} {item.endDate}
              </div>
            )}
          </div>

          {item.description && (
            <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line pl-0 print:text-xs mt-2 print:mt-1">
              {item.description}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  // 渲染纯文本内容
  const renderTextContent = (data: TextContent) => (
    <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line print:text-xs">
      {data.content}
    </div>
  );

  // 渲染内容
  const renderContent = () => {
    if (editorType === 'list') {
      return renderListContent(section.data as ListItem[]);
    } else if (editorType === 'text') {
      return renderTextContent(section.data as TextContent);
    } else {
      return renderTimelineContent(section.data as TimelineItem[]);
    }
  };

  // 渲染对应的编辑器
  const renderEditor = () => {
    if (editorType === 'list') {
      return (
        <ListEditor
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          initialData={section.data as ListItem[]}
          onSave={(newData, iconName) => {
            onUpdate(newData, iconName);
          }}
          title={section.title}
          currentIcon={section.iconName}
        />
      );
    } else if (editorType === 'text') {
      return (
        <TextEditor
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          initialData={section.data as TextContent}
          onSave={(newData, iconName) => {
            onUpdate(newData, iconName);
          }}
          title={section.title}
          currentIcon={section.iconName}
        />
      );
    } else {
      return (
        <TimelineEditor
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          initialData={section.data as TimelineItem[]}
          onSave={(newData, iconName) => {
            onUpdate(newData, iconName);
          }}
          title={section.title}
          currentIcon={section.iconName}
        />
      );
    }
  };

  return (
    <>
      {/* 简约风格模块 */}
      <div className="relative group">
        {isEditable && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-100 h-7 w-7 print:hidden z-10"
            onClick={() => setIsEditing(true)}
          >
            <Edit3 className="h-3 w-3 text-gray-600" />
          </Button>
        )}

        {/* 模块标题 */}
        <h2 className="text-lg font-bold text-gray-900 mb-4 print:text-base print:mb-3 border-b border-gray-200 pb-2 print:pb-1">
          {section.title}
        </h2>

        {/* 内容渲染 */}
        {renderContent()}
      </div>

      {/* 编辑器 */}
      {isEditing && renderEditor()}
    </>
  );
};
