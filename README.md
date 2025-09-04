# 📝 Resumaker - 现代化简历制作器

一个基于 React + TypeScript 构建的现代化简历制作器，支持实时编辑、多种编辑器类型、自动保存等功能。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)
![React](https://img.shields.io/badge/React-19.1-blue.svg)
![Vite](https://img.shields.io/badge/Vite-7.0-646CFF.svg)

## ✨ 功能特性

### 🎯 核心功能
- **📝 实时编辑**: 所见即所得的简历编辑体验
- **💾 自动保存**: 编辑内容自动保存到本地存储
- **🖨️ 打印预览**: 专门优化的打印预览页面
- **📱 响应式设计**: 完美适配各种屏幕尺寸

### 🔧 编辑器类型
- **⏰ 时间线编辑器**: 适合工作经历、教育背景等时序信息
- **📋 列表编辑器**: 适合技能清单、证书列表等条目信息
- **📄 文本编辑器**: 适合自我介绍、备注等自由文本内容
- **👤 基本信息编辑器**: 专门的个人信息编辑界面

### 🎨 个性化定制
- **🔗 模块管理**: 拖拽调整模块顺序，自定义模块标题
- **🎭 图标定制**: 支持 Lucide Icons 图标库，可为每个模块设置图标
- **👀 可见性控制**: 灵活控制模块的显示/隐藏
- **🎪 编辑器类型切换**: 动态切换编辑器类型，数据自动转换

### 🚀 技术亮点
- **🎯 零 Prop Drilling**: 基于 Jotai 的现代状态管理，告别回调地狱
- **📦 模块化设计**: 组件职责清晰，易于维护和扩展
- **🔄 数据自动转换**: 编辑器类型切换时智能转换数据格式
- **🧹 自动保存机制**: 防抖优化的自动保存，避免数据丢失

## 🛠️ 技术栈

### 核心框架
- **React 19.1** - 现代化 UI 框架
- **TypeScript 5.8** - 类型安全的 JavaScript
- **Vite 7.0** - 现代化构建工具

### 状态管理
- **Jotai 2.12** - 原子化状态管理
- **Jotai Utils** - 本地存储集成

### UI 组件
- **Radix UI** - 无障碍访问的组件库
- **Lucide React** - 现代化图标库
- **React Image Crop** - 图片裁剪功能

### 样式方案
- **Tailwind CSS 3.4** - 实用优先的 CSS 框架
- **Class Variance Authority** - 组件变体管理
- **Tailwind Merge** - CSS 类名合并优化

### 开发工具
- **ESLint 9.30** - 代码质量检查
- **Prettier 3.6** - 代码格式化
- **PostCSS** - CSS 后处理器

## 📁 项目结构

```
src/
├── components/          # UI 组件
│   ├── avatar/         # 头像相关组件
│   ├── dialogs/        # 对话框组件
│   ├── editors/        # 各种编辑器组件
│   ├── layout/         # 布局组件
│   ├── theme/          # 主题相关组件
│   └── ui/             # 基础 UI 组件
├── containers/          # 容器组件
├── hooks/              # 自定义 Hooks
│   └── components/     # 组件专用 Hooks
├── lib/                # 工具函数
├── pages/              # 页面组件
├── store/              # 状态管理
├── types/              # TypeScript 类型定义
└── assets/             # 静态资源
```

## 🚀 快速开始

### 环境要求
- Node.js >= 18.0.0
- npm 或 yarn 或 pnpm

### 安装依赖

```bash
# 使用 npm
npm install

# 使用 yarn
yarn install

# 使用 pnpm
pnpm install
```

### 开发运行

```bash
# 启动开发服务器
npm run dev

# 使用 yarn
yarn dev

# 使用 pnpm
pnpm dev
```

访问 http://localhost:5173 即可看到应用。

### 构建部署

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 📖 使用指南

### 基本操作
1. **编辑简历**: 点击各模块的编辑按钮进入编辑模式
2. **添加模块**: 使用模块管理器添加自定义模块
3. **调整顺序**: 拖拽模块卡片调整显示顺序
4. **预览打印**: 点击预览按钮查看打印效果

### 编辑器使用
- **时间线编辑器**: 适合有时间序列的内容，如工作经历
- **列表编辑器**: 适合条目式内容，如技能列表
- **文本编辑器**: 适合段落式内容，如自我介绍

### 自定义功能
- **图标选择**: 在编辑模式下可以更换模块图标
- **模块管理**: 通过模块管理器添加、删除、调整模块
- **数据导出**: 支持打印和 PDF 导出

## 🎯 架构设计

### 状态管理架构
```
用户交互 → 组件 → useResumeActions → Jotai Atoms → 状态更新
```

### 核心 Hooks
- `useResumeActions`: 核心状态操作封装
- `useResumeEditor`: 编辑器与状态管理集成
- `useTimelineSection`: 时间线模块业务逻辑
- `useBasicInfoSection`: 基本信息模块业务逻辑
- `useSectionManager`: 模块管理业务逻辑

### 组件设计原则
- **单一职责**: 每个组件只负责一个功能
- **props 纯净**: 编辑器组件保持通用性
- **状态集中**: 使用 Jotai 集中管理状态
- **类型安全**: 完整的 TypeScript 类型定义

## 🤝 开发规范

### 代码规范
```bash
# 代码检查
npm run lint

# 自动修复
npm run lint:fix

# 格式化代码
npm run format

# 类型检查
npm run type-check
```

### 提交规范
请遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范。

## 📝 开发计划

- [ ] 多主题支持
- [ ] 模板系统
- [ ] 云端同步
- [ ] 多语言支持
- [ ] 导出 PDF 功能

## 📄 许可证

本项目采用 [MIT](LICENSE) 许可证。

## 🙏 致谢

感谢以下开源项目：
- [React](https://reactjs.org/)
- [Jotai](https://jotai.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)

---

如果这个项目对你有帮助，请给个 ⭐️ 支持一下！
