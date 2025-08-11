import { useState } from 'react'
import { Edit3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TimelineEditor } from './TimelineEditor'
import { getIconByName } from '@/config/icons'
import type { TimelineItem, ResumeSection } from '@/types/resume'

interface TimelineSectionProps {
  section: ResumeSection
  isEditable: boolean
  onUpdate: (data: TimelineItem[], iconName?: string) => void
}

export const TimelineSection = ({ 
  section, 
  isEditable, 
  onUpdate 
}: TimelineSectionProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const data = section.data as TimelineItem[]
  const IconComponent = getIconByName(section.iconName)

  return (
    <>
      <div className="bg-white rounded-lg p-4 shadow-sm relative group hover:shadow-md transition-all duration-200 print:shadow-none print:p-3 print:mb-4 print:rounded-none">
        {isEditable && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-100 h-7 w-7 print:hidden"
            onClick={() => setIsEditing(true)}
          >
            <Edit3 className="h-3 w-3 text-gray-600" />
          </Button>
        )}

        {/* 模块标题 */}
        <div className="flex items-center space-x-2 mb-4 print:mb-3 border-b border-gray-100 pb-2 print:border-gray-300">
          <div className="p-1 bg-blue-500 rounded print:p-0.5">
            {IconComponent && <IconComponent className="h-4 w-4 text-white print:h-3 print:w-3" />}
          </div>
          <h2 className="text-base font-bold text-gray-800 print:text-sm">{section.title}</h2>
        </div>

        {/* 项目列表 */}
        <div className="space-y-4 print:space-y-3">
          {data.map((item, index) => (
            <div key={item.id} className="relative">
              {/* 分割线 */}
              {index > 0 && (
                <div className="border-t border-gray-50 -mt-2 mb-2 print:border-gray-200 print:-mt-1.5 print:mb-1.5"></div>
              )}
              
              <div className="p-3 rounded bg-gray-50/30 print:p-2 print:bg-transparent">
                <div className="flex justify-between items-start mb-2 print:mb-1">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-800 mb-1 print:text-xs print:mb-0.5">{item.title}</h3>
                    {item.subtitle && (
                      <p className="text-xs text-blue-600 font-medium mb-0.5 print:text-xs">{item.subtitle}</p>
                    )}
                    {item.secondarySubtitle && (
                      <p className="text-xs text-gray-600">{item.secondarySubtitle}</p>
                    )}
                  </div>
                  {(item.startDate || item.endDate) && (
                    <div className="bg-gray-100 px-2 py-1 rounded text-xs print:px-1 print:py-0.5 ml-2 shrink-0 print:bg-transparent print:border print:border-gray-300">
                      <span className="text-gray-700 font-medium print:text-gray-800">
                        {item.startDate} {item.startDate && item.endDate && '-'} {item.endDate}
                      </span>
                    </div>
                  )}
                </div>
                {item.description && (
                  <div className="text-xs text-gray-700 leading-relaxed whitespace-pre-line mt-2 print:text-xs print:mt-1">
                    {item.description}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 编辑器 */}
      {isEditing && (
        <TimelineEditor
          isOpen={true}
          onClose={() => setIsEditing(false)}
          initialData={data}
          onSave={(newData, iconName) => {
            onUpdate(newData, iconName)
            setIsEditing(false)
          }}
          title={section.title}
          currentIcon={section.iconName}
        />
      )}
    </>
  )
} 