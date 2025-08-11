import { BasicInfoSection } from './BasicInfoSection'
import { TimelineSection } from './TimelineSection'
import type { Resume, BasicInfo, TimelineItem } from '@/types/resume'

interface ResumeDisplayProps {
  resume: Resume
  onUpdateResume?: (resume: Resume) => void
  isEditable?: boolean
  className?: string
}

export const ResumeDisplay = ({ 
  resume, 
  onUpdateResume, 
  isEditable = false,
  className = ""
}: ResumeDisplayProps) => {
  const updateSection = (sectionId: string, data: BasicInfo | TimelineItem[], iconName?: string) => {
    if (!onUpdateResume) return
    const updatedSections = resume.sections.map(section => {
      if (section.id === sectionId) {
        const updatedSection = { ...section, data }
        if (iconName) {
          updatedSection.iconName = iconName
        }
        return updatedSection
      }
      return section
    })
    onUpdateResume({ ...resume, sections: updatedSections })
  }

  const getBasicInfoSection = () => {
    return resume.sections.find(section => section.type === 'basic')
  }

  const getTimelineSections = () => {
    return resume.sections.filter(section => section.type === 'timeline')
  }

  const isTopBottomLayout = resume.layout === 'top-bottom'
  const basicInfoSection = getBasicInfoSection()
  const timelineSections = getTimelineSections().filter(section => section.visible).sort((a, b) => a.order - b.order)

  return (
    <div className={`print-container ${className}`}>
      <div className={`flex ${isTopBottomLayout ? 'flex-col' : 'flex-col lg:flex-row'} gap-6 print:gap-4 ${
        isTopBottomLayout ? '' : 'print:flex-row'
      }`}>
        
        {/* 基本信息区域 */}
        <div className={`${
          isTopBottomLayout 
            ? 'w-full' 
            : 'w-full lg:w-1/3 print:w-1/3'
        }`}>
          {!isTopBottomLayout && (
            <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-lg shadow-md border border-blue-100 min-h-full print:shadow-none print:border-none print:bg-white print:rounded-none relative">
              {/* 装饰性背景元素 */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-lg print:hidden"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl print:hidden"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-200/20 to-blue-200/20 rounded-full blur-2xl print:hidden"></div>
              
              {/* 内容容器 */}
              <div className={`relative z-10 p-6 print:p-4 ${isEditable ? "top-6" : ""}`}>
                {basicInfoSection && (
                  <BasicInfoSection
                    section={basicInfoSection}
                    isTopBottomLayout={isTopBottomLayout}
                    isEditable={isEditable}
                    onUpdate={(data) => updateSection(basicInfoSection.id, data)}
                  />
                )}
              </div>
            </div>
          )}
          {isTopBottomLayout && basicInfoSection && (
            <BasicInfoSection
              section={basicInfoSection}
              isTopBottomLayout={isTopBottomLayout}
              isEditable={isEditable}
              onUpdate={(data) => updateSection(basicInfoSection.id, data)}
            />
          )}
        </div>

        {/* 时间线模块区域 */}
        <div className={`${
          isTopBottomLayout 
            ? 'w-full space-y-6 print:space-y-4' 
            : 'w-full lg:w-2/3 print:w-2/3 space-y-6 print:space-y-4'
        }`}>
          {timelineSections.map(section => (
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
  )
} 