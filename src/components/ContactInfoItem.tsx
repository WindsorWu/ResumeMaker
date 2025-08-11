import type { LucideIcon } from 'lucide-react'

interface ContactInfoItemProps {
  icon: LucideIcon
  value: string
  bgColor: string
  isTopBottomLayout: boolean
}

export const ContactInfoItem = ({ 
  icon: Icon, 
  value, 
  bgColor, 
  isTopBottomLayout 
}: ContactInfoItemProps) => {
  return (
    <div className={`flex items-center ${
      isTopBottomLayout 
        ? 'space-x-2' 
        : 'space-x-3 p-3 bg-white/50 backdrop-blur-sm rounded-lg print:bg-transparent print:p-1'
    }`}>
      <div className={`${bgColor} rounded ${
        isTopBottomLayout 
          ? 'p-1 print:p-0.5' 
          : 'p-1.5 print:p-1'
      }`}>
        <Icon className={`text-white flex-shrink-0 ${
          isTopBottomLayout 
            ? 'h-4 w-4 print:h-3 print:w-3' 
            : 'h-4 w-4 print:h-3 print:w-3'
        }`} />
      </div>
      <span className={`text-gray-700 font-medium ${
        isTopBottomLayout 
          ? 'text-sm print:text-xs' 
          : 'text-sm print:text-xs'
      }`}>{value}</span>
    </div>
  )
} 