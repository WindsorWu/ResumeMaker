import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import type { Resume } from '@/types/resume'

// 默认简历数据
const initialResume: Resume = {
  id: '1',
  title: '我的简历',
  template: 'default',
  layout: 'side-by-side', // 默认使用左右布局
  sections: [
    {
      id: 'basic-info',
      title: '基本信息',
      icon: 'user',
      iconName: 'user',
      type: 'basic',
      visible: true,
      order: 1,
      data: {
        name: '请设置姓名',
        email: 'your.email@example.com',
        phone: '+86 138 0000 0000',
        gender: '',
        age: '',
        location: '北京市',
        website: ''
      }
    },
    {
      id: 'education',
      title: '教育经历',
      icon: 'graduation-cap',
      iconName: 'graduation-cap',
      type: 'timeline',
      visible: true,
      order: 2,
      data: [
        {
          id: '1',
          title: '计算机科学与技术',
          subtitle: '本科学位',
          secondarySubtitle: '某某大学',
          startDate: '2020年9月',
          endDate: '2024年6月',
          description: '主修计算机科学与技术专业，学习了数据结构、算法、操作系统、数据库等核心课程。获得优秀毕业生称号，GPA 3.8/4.0。'
        }
      ]
    },
    {
      id: 'experience',
      title: '工作经历',
      icon: 'briefcase',
      iconName: 'briefcase',
      type: 'timeline',
      visible: true,
      order: 3,
      data: [
        {
          id: '1',
          title: '前端工程师',
          subtitle: '全职职位',
          secondarySubtitle: '某某科技公司',
          startDate: '2024年7月',
          endDate: '至今',
          description: '负责公司核心产品的前端开发工作：使用 React、TypeScript、TailwindCSS 等现代技术栈开发用户界面；参与产品需求分析和技术方案设计；优化前端性能，提升用户体验。'
        }
      ]
    },
    {
      id: 'projects',
      title: '项目经历',
      icon: 'folder-open',
      iconName: 'folder-open',
      type: 'timeline',
      visible: true,
      order: 4,
      data: [
        {
          id: '1',
          title: '简历制作工具',
          subtitle: '个人项目',
          secondarySubtitle: 'React + TypeScript + TailwindCSS',
          startDate: '2024年8月',
          endDate: '2024年8月',
          description: '开发了一个功能完整的在线简历制作工具：支持实时编辑简历内容；提供美观的简历模板；支持头像上传功能；响应式设计，适配各种设备。'
        }
      ]
    }
  ]
}

// 使用 atomWithStorage 实现本地存储
export const resumeAtom = atomWithStorage<Resume>('resume-data', initialResume)

// 重置简历数据的函数
export const resetResumeAtom = atom(
  null,
  (get, set) => {
    set(resumeAtom, initialResume)
  }
) 