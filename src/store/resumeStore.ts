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
  pageSettings: {
    enableMultiPage: true,
    totalPages: 2,
  },
  sections: [
    {
      id: 'basic-info',
      title: '基本信息',
      iconName: 'user',
      type: 'basic',
      visible: true,
      order: 1,
      data: {
        avatar: 'https://imgs.aixifan.com/o_1eemg57nh11nd4d01p9d17i31vi67.gif',
        name: '温莎',
        email: 'wenzhewu2@163.com',
        phone: '12345678901',
        gender: '男',
        age: '22',
        location: '上海',
        website: '',
        customFields: [
          {
            id: '1',
            label: '0年工作经验',
            value: '',
            iconName: 'briefcase',
          },
          {
            id: '2',
            label: '期望城市',
            value: '上海',
            iconName: 'map-pin',
          },
          {
            id: '3',
            label: '个人网站',
            value: 'https://nekolin.top',
            iconName: 'globe',
          },
          {
            id: '4',
            label: 'b站',
            value: 'https://space.bilibili.com/13177962',
            iconName: 'tv',
          },
        ],
      },
    },
    {
      id: 'advantages',
      title: '个人优势',
      iconName: 'star',
      type: 'list',
      editorType: 'text',
      visible: true,
      order: 2,
      data: {
        content:
          '1. 熟练使用 OpenCV + Qt5 技术\n2. 掌握 javascript (es6+) 和 Vue  技术栈。'
      },
    },
    {
      id: 'projects',
      title: '项目经历',
      iconName: 'settings',
      type: 'timeline',
      editorType: 'timeline',
      visible: true,
      order: 3,
      data: [
        {
          description:
            '一个基于 shape predictor 68 face landmarks 构建的人脸识别瞌睡检测，提供驾驶员疲劳追踪的体验。\n- 这份项目是开源的，地址 https://github.com/WindsorWu/Face-recognition-sleepiness-detection\n- ',
          endDate: '',
          id: '1756977218779',
          secondarySubtitle: '',
          startDate: '',
          subtitle: '',
          title: '瞌睡检测系统',
        },
        {
          description:
            '一个基于百度云人脸识别构建的基于智能AI考勤系统，可以为全校师生提供考勤服务。',
          endDate: '',
          id: '1758469873123',
          secondarySubtitle: '',
          startDate: '',
          subtitle: '',
          title: '智能AI考勤系统',
        },
        {
          id: '1757064171447',
          title: '个人网站',
          subtitle: '全栈',
          secondarySubtitle: 'nekolin.top',
          startDate: '',
          endDate: '',
          description:
            '一个基于 Hexo 构建的博客网站\n- Google搜索"nekolin blog"，本站排名第一\n- 基于Upptime & Baidu Analytics 实现全站流量统计\n- 当然博客网站最重要的还是内容，希望您能通过博文来更全面了解我',
        },
      ],
    },
    {
      id: 'education',
      title: '教育背景',
      iconName: 'graduation-cap',
      type: 'timeline',
      editorType: 'timeline',
      visible: true,
      order: 4,
      data: [
        {
          id: '1',
          title: '上海杉达学院',
          subtitle: '软件工程学士',
          secondarySubtitle: '2024.09 - 2026.06',
          startDate: '2024.09',
          endDate: '2026.06',
          description: '',
        },
        {
          id: '2',
          title: '上海电子信息职业技术学院',
          subtitle: '人工智能应用技术大专',
          secondarySubtitle: '2021.09 - 2024.06',
          startDate: '2021.09',
          endDate: '2024.06',
          description: '',
        },
      ],
    },
    {
      id: 'experience',
      title: '校园经历',
      iconName: 'briefcase',
      type: 'timeline',
      editorType: 'timeline',
      visible: true,
      order: 5,
      data: [
        {
          id: '1',
          title: '上海电子信息职业技术学院校团委社会实践部',
          subtitle: '副部长（主持工作）',
          secondarySubtitle: '',
          startDate: '2022.09',
          endDate: '2023.06',
          description:
            '负责校级社会实践各项活动审核招募工作\\n\\n【主要职责】\\n• \\n\\n【核心业绩】\\n• ',
        },
        {
          id: '2',
          title: '',
          subtitle: '',
          secondarySubtitle: '',
          startDate: '',
          endDate: '',
          description:
            '',
        },
      ],
      pageNumber: 2,
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

/**
 * 更新页面设置
 */
export const updatePageSettingsAtom = atom(
  null,
  (get, set, pageSettings: { enableMultiPage: boolean; totalPages: number }) => {
    const resume = get(resumeAtom);
    set(resumeAtom, { ...resume, pageSettings });
  }
);

/**
 * 批量更新多个模块的页面分配
 */
export const updateMultipleSectionsPageAtom = atom(
  null,
  (get, set, updates: Array<{ sectionId: string; pageNumber: number }>) => {
    const resume = get(resumeAtom);
    const updatedSections = resume.sections.map((section) => {
      const update = updates.find((u) => u.sectionId === section.id);
      if (update) {
        return { ...section, pageNumber: update.pageNumber };
      }
      return section;
    });
    set(resumeAtom, { ...resume, sections: updatedSections });
  }
);

/**
 * 获取指定页面的模块列表
 */
export const getSectionsByPageAtom = atom((get) => {
  return (pageNumber: number) => {
    const resume = get(resumeAtom);
    return resume.sections
      .filter((section) => section.type !== 'basic')
      .filter((section) => (section.pageNumber || 1) === pageNumber)
      .filter((section) => section.visible)
      .sort((a, b) => a.order - b.order);
  };
});
