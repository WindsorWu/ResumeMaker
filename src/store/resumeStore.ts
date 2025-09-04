import type {
  BasicInfo,
  ListItem,
  Resume,
  ResumeSection,
  TextContent,
  TimelineItem,
} from '@/types/resume';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const initialResume: Resume = {
  id: '1',
  title: '我的简历',
  template: 'default',
  layout: 'top-bottom', // 布局没用，以后可能改成theme，即多主题
  sections: [
    {
      id: 'basic-info',
      title: '基本信息',
      iconName: 'user',
      type: 'basic',
      visible: true,
      order: 1,
      data: {
        name: '白玩',
        email: 'example@gmail.com',
        phone: '12345678901',
        gender: '男',
        age: '24',
        location: '北京',
        website: '',
        customFields: [
          {
            id: '1',
            label: '7年工作经验',
            value: '',
            iconName: 'briefcase',
          },
          {
            id: '2',
            label: '期望城市',
            value: '北京',
            iconName: 'map-pin',
          },
          {
            id: '3',
            label: '个人网站',
            value: 'https://whitemeta.cn',
            iconName: 'globe',
          },
          {
            id: '4',
            label: 'b站账号',
            value: 'https://space.bilibili.com/107889531',
            iconName: 'tv',
          },
          {
            id: '5',
            label: '清华大学',
            value: '',
            iconName: 'graduation-cap',
          },
        ],
      },
    },
    {
      id: 'advantages',
      title: '个人优势',
      iconName: 'star',
      type: 'list',
      editorType: 'list',
      visible: true,
      order: 2,
      data: [
        {
          id: '1',
          content: '精通HTML、CSS、JavaScript技术，能够独立完成前端页面的开发及优化。',
        },
        {
          id: '2',
          content: '对于Web前端技术非常广泛，拥有熟练掌握jQuery、Bootstrap等前端框架的经验。',
        },
        {
          id: '3',
          content: '能够独立解决前端开发中遇到的问题，具备良好的学习能力和团队合作精神。',
        },
      ],
    },
    {
      id: 'projects',
      title: '项目经历',
      iconName: 'folder-open',
      type: 'timeline',
      editorType: 'timeline',
      visible: true,
      order: 3,
      data: [
        {
          id: '1',
          title: '项目内容：',
          subtitle: 'Web前端开发',
          secondarySubtitle: '杀命名项目',
          startDate: '2000.01',
          endDate: '2000.06',
          description:
            '1.响应式网站开发：使用HTML、CSS、JavaScript等技术开发了一个响应式网站，实现了适应不同尺寸的设备，提高了用户体验。\n\n2.页面性能优化：对公司官网进行了性能优化，通过压缩图片、减少HTTP请求等方式，将页面加载速度提升了7X%。\n\n3.前端组件开发：开发了一些通用的前端组件，提高了团队工作效率，同时保证了代码的可重用性。\n\n4.跨平台应用开发：使用React Native技术开发了一个教育平台的移动端应用，同时兼容iOS和Android系统，提高了应用的覆盖面和用户满意度。\n\n项目业绩：\n1.响应式网站开发：将网站的跳出率降低了7X%，提高了用户留存时间。\n2.页面性能优化：将页面的平均加载时间降低了X秒，提高了用户对网站的满意度。\n3.前端组件开发：使得团队在开发过程中可以更加高效地完成工作，提高了开发效率。\n4.跨平台应用开发：应用下载达到了XX，用户评分高达X分，用户反馈良好',
        },
      ],
    },
    {
      id: 'experience',
      title: '工作经历',
      iconName: 'briefcase',
      type: 'timeline',
      editorType: 'timeline',
      visible: true,
      order: 4,
      data: [
        {
          id: '1',
          title: '阿里巴巴',
          subtitle: '2000.01 - 2000.06',
          secondarySubtitle: '',
          startDate: '',
          endDate: '',
          description: '',
        },
        {
          id: '2',
          title: '字节跳动',
          subtitle: '2000.01 - 2000.06',
          secondarySubtitle: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    },
  ],
};

export const resumeAtom = atomWithStorage<Resume>('resume-data', initialResume);

export const resetResumeAtom = atom(null, (_get, set) => {
  set(resumeAtom, initialResume);
});

/**
 * 更新指定模块的数据
 */
export const updateSectionDataAtom = atom(
  null,
  (
    get,
    set,
    update: {
      sectionId: string;
      data: BasicInfo | TimelineItem[] | ListItem[] | TextContent;
      iconName?: string;
    }
  ) => {
    const resume = get(resumeAtom);
    const updatedSections = resume.sections.map((section) => {
      if (section.id === update.sectionId) {
        return {
          ...section,
          data: update.data,
          ...(update.iconName !== undefined && {
            iconName: update.iconName,
            icon: update.iconName,
          }),
        };
      }
      return section;
    });
    set(resumeAtom, { ...resume, sections: updatedSections });
  }
);

/**
 * 更新指定模块的属性（标题、图标、可见性等）
 */
export const updateSectionPropsAtom = atom(
  null,
  (get, set, update: { sectionId: string; props: Partial<Omit<ResumeSection, 'id' | 'data'>> }) => {
    const resume = get(resumeAtom);
    const updatedSections = resume.sections.map((section) => {
      if (section.id === update.sectionId) {
        return { ...section, ...update.props };
      }
      return section;
    });
    set(resumeAtom, { ...resume, sections: updatedSections });
  }
);

/**
 * 更新模块顺序
 */
export const updateSectionsOrderAtom = atom(null, (get, set, sections: ResumeSection[]) => {
  const resume = get(resumeAtom);
  // 获取基本信息模块
  const basicSection = resume.sections.find((section) => section.type === 'basic');

  // 合并基本信息模块和其他模块，确保基本信息模块不丢失
  const allSections = basicSection ? [basicSection, ...sections] : sections;

  set(resumeAtom, { ...resume, sections: allSections });
});

/**
 * 添加新模块
 */
export const addSectionAtom = atom(null, (get, set, section: ResumeSection) => {
  const resume = get(resumeAtom);
  set(resumeAtom, { ...resume, sections: [...resume.sections, section] });
});

/**
 * 删除模块
 */
export const deleteSectionAtom = atom(null, (get, set, sectionId: string) => {
  const resume = get(resumeAtom);
  const updatedSections = resume.sections.filter((section) => section.id !== sectionId);
  set(resumeAtom, { ...resume, sections: updatedSections });
});

/**
 * 获取指定模块
 */
export const getSectionAtom = atom((get) => {
  return (sectionId: string) => {
    const resume = get(resumeAtom);
    return resume.sections.find((section) => section.id === sectionId);
  };
});

/**
 * 获取所有非基本信息模块
 */
export const getNonBasicSectionsAtom = atom((get) => {
  const resume = get(resumeAtom);
  return resume.sections
    .filter((section) => section.type !== 'basic')
    .sort((a, b) => a.order - b.order);
});

/**
 * 获取基本信息模块
 */
export const getBasicSectionAtom = atom((get) => {
  const resume = get(resumeAtom);
  return resume.sections.find((section) => section.type === 'basic');
});
