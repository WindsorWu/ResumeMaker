import type { LucideIcon } from "lucide-react"

export interface CustomField {
  id: string
  label: string
  value: string
  icon: string
  iconName: string
}

export interface BasicInfo {
  avatar?: string
  name: string
  email: string
  phone: string
  gender?: string
  age?: string
  location?: string
  website?: string
  customFields?: CustomField[]
}

export interface TimelineItem {
  id: string
  title: string
  subtitle?: string
  secondarySubtitle?: string
  startDate?: string
  endDate?: string
  description: string
}

export interface ResumeSection {
  id: string
  title: string
  icon: string
  iconName: string
  type: 'basic' | 'timeline' | 'custom'
  visible: boolean
  order: number
  data: BasicInfo | TimelineItem[] | Record<string, unknown>
}

export interface Resume {
  id: string
  title: string
  sections: ResumeSection[]
  template: string
  layout: 'side-by-side' | 'top-bottom' // 新增布局类型
}

export interface IconOption {
  name: string
  icon: LucideIcon
} 