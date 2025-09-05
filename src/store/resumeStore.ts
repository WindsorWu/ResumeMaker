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
        avatar: 'https://phzdoc.oss-cn-beijing.aliyuncs.com/uPic/avatar.JPG',
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
            label: 'b站',
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
      editorType: 'text',
      visible: true,
      order: 2,
      data: {
        content:
          '1. 熟练使用 html5 + css3 技术\n2. 熟练掌握 javascript (es6+) 和 Vue  技术栈,并深入了解其原理。\n3. 丰富的大型网站开发经验，对前端工程化，性能优化有丰富的实战经验。\n4. 熟练掌握 Typescript，SCSS 。\n5. 擅长 webpack  配置与前端架构设计。\n6. 熟悉 node.js ，包括 express/koa  等服务端框架',
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
            '一个基于 React 19 构建的现代化在线简历编辑器，提供所见即所得的编辑体验。\n- 组件库为了更轻量、更容易定制，选择了Shadcn/UI \n- 构建工具选择了 Vite 并优化了首屏加载性能，总资源小于1MB\n- 基于 Docker + GithubAction 实现全自动 CI/CD\n- 这份项目是开源的，地址 https://github.com/WhiteP1ay/resumaker\n- 这份简历就是通过这个编辑工具制作出来的',
          endDate: '',
          id: '1756977218779',
          secondarySubtitle: 'resume.whitemeta.cn',
          startDate: '',
          subtitle: '全栈',
          title: '简历编辑器',
        },
        {
          id: '1757064171447',
          title: '个人网站',
          subtitle: '全栈',
          secondarySubtitle: 'whitemeta.cn',
          startDate: '',
          endDate: '',
          description:
            '一个基于 Next 15 构建的博客网站\n- 良好的SEO，Google搜索"whitemeta"，本站排名第一\n- 基于TailwindCSS 实现 PC & H5 双端适配\n- 谷歌Lighthouse性能评分99分\n- 当然博客网站最重要的还是内容，希望您能通过博文来更全面了解我',
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
