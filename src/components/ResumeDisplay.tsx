import type { Resume } from '@/types/resume';
import { BasicInfoSection } from './theme/BasicInfoSection';
import { TimelineSection } from './theme/TimelineSection';

interface ResumeDisplayProps {
  resume: Resume;
  isEditable?: boolean;
  className?: string;
}

export const ResumeDisplay = ({
  resume,
  isEditable = false,
  className = '',
}: ResumeDisplayProps) => {
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
          <BasicInfoSection section={basicInfoSection} isEditable={isEditable} />
        )}

        {/* 时间线模块区域 - 主体内容 */}
        <div className="px-8 pb-8 print:px-6 print:pb-6">
          <div className="space-y-6 print:space-y-4">
            {timelineSections.map((section) => (
              <TimelineSection key={section.id} section={section} isEditable={isEditable} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
