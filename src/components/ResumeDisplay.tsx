import type { BasicInfo, ListItem, Resume, TextContent, TimelineItem } from '@/types/resume';
import { BasicInfoSection } from './theme/BasicInfoSection';
import { TimelineSection } from './theme/TimelineSection';

interface ResumeDisplayProps {
  resume: Resume;
  onUpdateResume?: (resume: Resume) => void;
  isEditable?: boolean;
  className?: string;
}

export const ResumeDisplay = ({
  resume,
  onUpdateResume,
  isEditable = false,
  className = '',
}: ResumeDisplayProps) => {
  const updateSection = (
    sectionId: string,
    data: BasicInfo | TimelineItem[] | ListItem[] | TextContent,
    iconName?: string
  ) => {
    if (!onUpdateResume) return;
    const updatedSections = resume.sections.map((section) => {
      if (section.id === sectionId) {
        const updatedSection = { ...section, data };
        if (iconName) {
          updatedSection.iconName = iconName;
        }
        return updatedSection;
      }
      return section;
    });
    onUpdateResume({ ...resume, sections: updatedSections });
  };

  const getBasicInfoSection = () => {
    return resume.sections.find((section) => section.type === 'basic');
  };

  const getTimelineSections = () => {
    return resume.sections.filter(
      (section) => section.type === 'timeline' || section.type === 'list' || section.type === 'text'
    );
  };

  const basicInfoSection = getBasicInfoSection();
  const timelineSections = getTimelineSections()
    .filter((section) => section.visible)
    .sort((a, b) => a.order - b.order);

  return (
    <div className={`print-container ${className}`}>
      {/* 简约风格简历容器 */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none print:max-w-none">
        {/* 基本信息区域 - 顶部 */}
        {basicInfoSection && (
          <BasicInfoSection
            section={basicInfoSection}
            isEditable={isEditable}
            onUpdate={(data) => updateSection(basicInfoSection.id, data)}
          />
        )}

        {/* 时间线模块区域 - 主体内容 */}
        <div className="px-8 pb-8 print:px-6 print:pb-6">
          <div className="space-y-6 print:space-y-4">
            {timelineSections.map((section) => (
              <TimelineSection
                key={section.id}
                section={section}
                isEditable={isEditable}
                onUpdate={(data, iconName) => updateSection(section.id, data, iconName)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
