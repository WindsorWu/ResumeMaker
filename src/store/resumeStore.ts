import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { Resume } from '@/types/resume';

// 默认简历数据
const initialResume: Resume = {
  id: '1',
  title: '我的简历',
  template: 'default',
  layout: 'top-bottom', // 默认使用上下布局
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
        name: '白玩儿',
        email: 'whitePlay@gmail.com',
        phone: '12345678901',
        gender: '男',
        age: '24',
        location: '北京',
        website: '',
        customFields: [
          {
            id: '1',
            label: '16年工作经验',
            value: '求职意向: Web前端开发',
            iconName: 'briefcase',
          },
          {
            id: '2',
            label: '期望城市',
            value: '北京',
            iconName: 'map-pin',
          },
        ],
      },
    },
    {
      id: 'advantages',
      title: '个人优势',
      icon: 'star',
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
      id: 'experience',
      title: '工作经历',
      icon: 'briefcase',
      iconName: 'briefcase',
      type: 'timeline',
      editorType: 'timeline',
      visible: true,
      order: 3,
      data: [
        {
          id: '1',
          title: '工作内容：',
          subtitle: 'Web前端开发',
          secondarySubtitle: '北京真格信息科技有限公司',
          startDate: '2000.01',
          endDate: '2000.06',
          description:
            '1.网页设计与制作：负责公司网站的设计与制作，主要负责前端页面的开发和优化，使用HTML、CSS和JavaScript等技术，提高网站的用户体验。\n\n2.响应式设计：负责页面的响应式设计，确保网站能够适应不同的设备屏幕大小，提高用户体验。\n\n3.网站维护：定期检查网站的运行情况，及时修复问题，确保网站正常运行。\n\n4.团队协作：与后端开发人员密切合作，进行开发，确保项目按时完成。\n\n工作业绩：\n1.成功开发了7个网站页面，提高了网站的用户体验。\n2.成功实现了7个网站的响应式设计，提高了在移动设备上的用户体验。\n3.定期检查网站运行情况，维护了7个网站，保证了网站的正常运行。\n4.与后端开发人员合作完成了7个项目，保证了项目按时完成。',
        },
      ],
    },
    {
      id: 'projects',
      title: '项目经历',
      icon: 'folder-open',
      iconName: 'folder-open',
      type: 'timeline',
      editorType: 'timeline',
      visible: true,
      order: 4,
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
  ],
};

// 使用 atomWithStorage 实现本地存储
export const resumeAtom = atomWithStorage<Resume>('resume-data', initialResume);

// 重置简历数据的函数
export const resetResumeAtom = atom(null, (_get, set) => {
  set(resumeAtom, initialResume);
});
