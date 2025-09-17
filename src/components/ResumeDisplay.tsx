import type { Resume } from '@/types/resume';
import { BasicInfoSection } from './theme/BasicInfoSection';
import { TimelineSection } from './theme/TimelineSection';

interface ResumeDisplayProps {
  resume: Resume;
  isEditable?: boolean;
  className?: string;
}

/**
 * 单页简历渲染组件
 */
const SinglePageResume = ({
  resume,
  isEditable,
  pageNumber = 1,
}: {
  resume: Resume;
  isEditable: boolean;
  pageNumber?: number;
}) => {
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
    .filter((section) => {
      // 如果启用了多页模式，则按页面筛选
      if (resume.pageSettings?.enableMultiPage) {
        return (section.pageNumber || 1) === pageNumber;
      }
      return true;
    })
    .sort((a, b) => a.order - b.order);

  // 基本信息默认在第一页显示
  const shouldShowBasicInfo = pageNumber === 1;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none print:max-w-none">
      {/* 基本信息区域 - 只在第一页显示 */}
      {shouldShowBasicInfo && basicInfoSection && (
        <BasicInfoSection section={basicInfoSection} isEditable={isEditable} />
      )}

      {/* 主体内容 */}
      {timelineSections.length > 0 && (
        <div className={`px-8 pb-8 print:px-6 print:pb-6 ${pageNumber !== 1 ? 'pt-8' : ''}`}>
          <div className="space-y-6 print:space-y-4">
            {timelineSections.map((section) => (
              <TimelineSection key={section.id} section={section} isEditable={isEditable} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const ResumeDisplay = ({
  resume,
  isEditable = false,
  className = '',
}: ResumeDisplayProps) => {
  // 如果没有启用多页模式，使用原有的单页显示逻辑
  if (!resume.pageSettings?.enableMultiPage || resume.pageSettings.totalPages <= 1) {
    return (
      <div className={`print-container ${className}`}>
        <SinglePageResume resume={resume} isEditable={isEditable} />
      </div>
    );
  }

  // 多页模式渲染
  const totalPages = resume.pageSettings.totalPages;

  return (
    <div className={`print-container ${className}`}>
      <div className="space-y-8 print:space-y-0">
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          return (
            <div
              key={pageNumber}
              className="print:page-break-after-always print:page-break-inside-avoid"
            >
              <SinglePageResume resume={resume} isEditable={isEditable} pageNumber={pageNumber} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
