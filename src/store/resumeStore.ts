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
            label: '期望城市',
            value: '上海',
            iconName: 'map-pin',
          },
          {
            id: '2',
            label: '个人网站',
            value: 'https://nekolin.top',
            iconName: 'globe',
          },
        ],
      },
    },
    {
      id: 'education',
      title: '教育背景',
      iconName: 'graduation-cap',
      type: 'timeline',
      editorType: 'timeline',
      visible: true,
      order: 2,
      data: [
        {
          id: '1',
          title: '上海杉达学院',
          subtitle: '软件工程学士',
          secondarySubtitle: '2024.09 - 2026.06',
          startDate: '2024.09',
          endDate: '2026.06',
          description: '【主修课程】计算机组成原理、计算机网络、操作系统、数据结构、数据库原理及技术、软件需求工程、软件测试、Java Web开发n【绩点成绩】3.31/4.0\n【在校荣誉】校计算机设计大赛三等奖\n【证书】计算机三级（Java）',
        },
        {
          id: '2',
          title: '上海电子信息职业技术学院',
          subtitle: '人工智能应用技术大专',
          secondarySubtitle: '2021.09 - 2024.06',
          startDate: '2021.09',
          endDate: '2024.06',
          description: '【主修课程】Linux操作系统、Python程序设计、机器视觉技术、机器学习、深度学习、嵌入式技术应用\n【绩点成绩】4.13/5.0\n【专业排名】3/80\n【在校荣誉】2022年华为ICT大赛上海市云赛道三等奖，上海市优秀毕业生，宝山区优秀志愿者，校级二等奖学金*1、三等奖学金*1，校级三好学生、优秀志愿者\n【证书】CET4、驾驶证',
        },
      ],
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
            '【项目概述】一个基于 shape predictor 68 face landmarks 构建的人脸识别瞌睡检测，提供驾驶员疲劳追踪的体验。\n【技术实现】该项目是一个基于 68 点人脸特征标记，利用 dlib、OpenCV、PySide6 等库，通过分析眼睛状态、嘴部状态及头部姿态实现实时瞌睡检测，并配备 UI 界面与警报功能的系统。 ',
          endDate: '',
          id: '1756977218779',
          secondarySubtitle: 'github.com/WindsorWu/Face-recognition-sleepiness-detection',
          startDate: '2023.09-2023.11',
          subtitle: '全栈开发',
          title: '瞌睡检测系统',
        },
        {
          description:
            '【项目概述】话咔咔聊天系统创意源于市场对适合重要信息交流的高效通讯工具的需求，具备注册登录、好友管理、聊天（一对一及群组，支持文本和表情）、通知及消息同步功能，旨在提供安全高效的通讯平台，支持快速部署与个性化定制，适用于公司或校园内部使用。\n【技术实现】该系统采用 B/S 与 C/S 架构结合的方式，后端以Spring Boot为核心，搭配 Redis、RabbitMQ、MySQL及MyBatis-Plus，前端运用 Vue 3+Vite，同时集成 WebSocket、Axios 等保障实时通讯，包含登录注册、好友管理、聊天群组、个人中心等功能页面，技术选型兼顾开发效率、性能与用户体验。\n项目获得2024年度上海杉达学院计算机设计大赛三等奖',
          endDate: '',
          id: '1758469873123',
          secondarySubtitle: '',
          startDate: '2024.10-2024.12',
          subtitle: '数据库开发',
          title: '话咔咔聊天系统',
        },
        {
          description:
            '【项目概述】基于Spring Boot和Vue框架的商城系统。系统主要功能包括：商品的上架、删除、查询、浏览，用户的注册、登录、密码修改，购物车管理，订单生成与管理等。\n【技术实现】前端使用 Vue 框架开发，后端使用 Spring Boot，项目采用Maven 进行依赖管理，数据持久化采用MySQL数据库。在Docker容器中部署，使用Redis 服务器、RabbitMQ 消息队列和ElasticSearch 搜索结果搜索引擎作为中间服务。',
          endDate: '',
          id: '1758469873123',
          secondarySubtitle: '',
          startDate: '2025.03-2025.06',
          subtitle: '全栈开发',
          title: '商城系统',
        },
        {
          description:
            '【项目概述】HyperOS EU用户可通过使用此项目，同时获取HyperOS EU的功能和HyperOS 大陆版的功能。\n【系统架构】包含 Xposed 模块以 Hook 系统及 HyperOS 相关包来修改系统属性，同时提供设备状态查看（如 Root、Magisk/Xposed 模块状态）和多种需 Root 权限的系统操作（如权限管理、日志处理等），支持多语言。\n',
          endDate: '',
          id: '1758463559412',
          secondarySubtitle: 'blog.nekolin.top/2025/01/24/HyperOSEULocalization/',
          startDate: '2025.01-至今',
          subtitle: '开发维护',
          title: 'HyperOS欧洲版本地化项目工具箱',
        },
        {
          id: '1757064171447',
          title: '个人网站',
          subtitle: '全栈开发',
          secondarySubtitle: 'nekolin.top',
          startDate: '',
          endDate: '',
          description:
            '一个基于 Hexo 构建的博客网站\n- Google搜索"nekolin blog"，本站排名第一\n- 基于Upptime & Baidu Analytics 实现全站流量统计与监控\n- 基于GitHub Actions实现自动化部署',
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
      order: 4,
      data: [
        {
          id: '1',
          title: '上海电子信息职业技术学院校团委社会实践部',
          subtitle: '副部长（主持工作）',
          secondarySubtitle: '',
          startDate: '2022.09',
          endDate: '2023.06',
          description:
            '负责校级社会实践各项活动审核招募工作\n【主要职责】\n•具体负责一年一度的暑期大学生“三下乡”、“西部计划”等社会实践活动\n•负责日常的社区精神文明共建活动主动联系各种社会资源，不断建立和拓展大学生社会实践基地，强化大学生社会实践工作的基地化、规范化、定期化建设。努力通过大学生社会实践活动加强社区的精神文明建设\n•制定校大学生社会实践的规划和方案，并联系学校各个职能部门进行具体的落实和安排',
        },
      ],
    },
    {
      id: 'advantages',
      title: '专业技能',
      iconName: 'star',
      type: 'list',
      editorType: 'text',
      visible: true,
      order: 5,
      data: {
        content:
          '后端开发：熟练掌握 Java 编程语言,熟悉 Spring Boot 框架，能够使用 MyBatis-Plus 进行数据库持久化操作。\n前端开发：熟悉 HTML、CSS、JavaScript 等前端基础技术，能够进行简单的页面开发和交互设计。了解 Vue 框架，能够快速搭建前端应用架构。\n数据库管理 :熟练掌握 MySQL 数据库，熟悉数据库设计原则和SQL语言，能够进行数据库建模、优化查询语句，具备数据库性能调优的基本能力。\n算法与数据结构：掌握基本数据结构(如数组、链表、树、图)和算法(如排序、搜索)，具备一定的算法设计与分析能力，能够运用算法知识解决实际问题。\n开发工具与版本控制：熟练使用 Intel IDEA 等开发工具,提高开发效率。掌握 Git 版本控制系统的常用操作能够进行代码管理与团队协作。会运用 Docker 容器快速地建立、测试和部署应用程序。',
      },
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
