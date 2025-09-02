# 代码格式化规范 📝

## 概述

本项目使用 **Prettier** + **ESLint** 来确保代码风格的一致性和质量。所有代码都应该遵循以下规范。

## 格式化工具配置

### Prettier 配置 (`.prettierrc`)

```json
{
  "semi": true,                     // 语句末尾添加分号
  "trailingComma": "es5",          // 在ES5支持的地方添加尾随逗号
  "singleQuote": true,             // 使用单引号而非双引号
  "printWidth": 100,               // 每行最大字符数
  "tabWidth": 2,                   // 缩进使用2个空格
  "useTabs": false,                // 使用空格而非Tab
  "quoteProps": "as-needed",       // 对象属性只在需要时添加引号
  "jsxSingleQuote": false,         // JSX中使用双引号
  "bracketSpacing": true,          // 对象字面量的大括号间添加空格
  "bracketSameLine": false,        // JSX标签的>不与最后一行内容同行
  "arrowParens": "always",         // 箭头函数参数始终用括号包围
  "endOfLine": "lf"                // 使用LF换行符
}
```

### ESLint 配置

项目使用 TypeScript ESLint 配置，包含：
- JavaScript 推荐规则
- TypeScript 推荐规则  
- React Hooks 推荐规则
- React Refresh 规则

## 代码风格规范

### 1. TypeScript/JavaScript

```typescript
// ✅ 好的示例
interface UserProps {
  name: string;
  age: number;
  isActive?: boolean;
}

export const UserComponent = ({ name, age, isActive = false }: UserProps) => {
  const [loading, setLoading] = useState(false);
  
  const handleClick = async () => {
    setLoading(true);
    try {
      await someAsyncOperation();
    } catch (error) {
      console.error('操作失败:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-container">
      <h2>{name}</h2>
      <p>年龄: {age}</p>
      {isActive && <span className="active-badge">活跃</span>}
    </div>
  );
};
```

### 2. React 组件

```typescript
// ✅ 组件文件结构
/**
 * 组件描述注释
 */
import { useState } from 'react';
import { SomeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ComponentProps } from '@/types';

interface MyComponentProps {
  // props 定义
}

export const MyComponent = ({ prop1, prop2 }: MyComponentProps) => {
  // hooks
  const [state, setState] = useState();
  
  // 事件处理函数
  const handleSomething = () => {
    // 实现
  };

  // 渲染
  return (
    <div className="component-wrapper">
      {/* JSX 内容 */}
    </div>
  );
};
```

### 3. 命名规范

```typescript
// ✅ 文件命名
- 组件文件: PascalCase.tsx (例: UserProfile.tsx)
- 工具文件: camelCase.ts (例: formatDate.ts)
- 类型文件: camelCase.ts (例: resume.ts)

// ✅ 变量命名
const userName = 'john';           // camelCase
const MAX_ITEMS = 100;            // UPPER_CASE (常量)
const isUserActive = true;        // boolean前缀 is/has/can

// ✅ 函数命名
const getUserData = () => {};     // 动词开头
const handleClick = () => {};     // 事件处理器用handle前缀
const formatUserName = () => {};  // 数据处理用动词

// ✅ 组件命名
export const UserProfile = () => {};  // PascalCase
```

### 4. 导入顺序

```typescript
// ✅ 导入顺序规范
// 1. React 相关
import { useState, useEffect } from 'react';

// 2. 第三方库
import { format } from 'date-fns';
import { User, Mail } from 'lucide-react';

// 3. 内部组件和UI
import { Button } from '@/components/ui/button';
import { UserCard } from '@/components/UserCard';

// 4. 工具函数和hooks
import { useDebounce } from '@/hooks/useDebounce';
import { formatDate } from '@/lib/utils';

// 5. 类型定义
import type { User, UserPreferences } from '@/types/user';
```

## 命令行工具

### 格式化命令

```bash
# 格式化整个项目
npm run format

# 检查格式化状态（不修改文件）
npm run format:check

# 格式化特定文件
npx prettier --write src/components/Button.tsx

# 格式化特定目录
npx prettier --write "src/components/**/*.{ts,tsx}"
```

### Lint 命令

```bash
# 检查代码质量
npm run lint

# 自动修复可修复的问题
npm run lint:fix

# 类型检查
npm run type-check
```

### 组合命令

```bash
# 完整的代码质量检查
npm run type-check && npm run lint && npm run format:check

# 自动修复所有可修复的问题
npm run lint:fix && npm run format
```

## Git 集成

### Pre-commit Hook (可选)

安装 `husky` 和 `lint-staged` 来在提交前自动格式化：

```bash
npm install --save-dev husky lint-staged
```

在 `package.json` 中添加：

```json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": [
      "prettier --write",
      "eslint --fix"
    ],
    "*.{json,md,css}": [
      "prettier --write"
    ]
  }
}
```

## 编辑器配置

### VS Code 设置

在项目根目录创建 `.vscode/settings.json`：

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

### 推荐的 VS Code 扩展

- Prettier - Code formatter
- ESLint
- TypeScript Importer
- Auto Rename Tag
- Bracket Pair Colorizer

## 注意事项

1. **提交前检查**: 确保运行 `npm run format` 和 `npm run lint:fix`
2. **类型安全**: 使用 TypeScript 严格模式，避免 `any` 类型
3. **组件拆分**: 保持组件文件在 200 行以内
4. **注释规范**: 为复杂逻辑添加清晰的注释
5. **性能考虑**: 合理使用 `useMemo` 和 `useCallback`

## 常见问题

### Q: Prettier 和 ESLint 冲突怎么办？
A: 项目配置已经处理了冲突，Prettier 负责格式化，ESLint 负责代码质量。

### Q: 如何忽略特定文件的格式化？
A: 在 `.prettierignore` 文件中添加文件路径。

### Q: 格式化后代码仍有 ESLint 错误？
A: 运行 `npm run lint:fix` 自动修复，或手动解决类型和逻辑错误。

---

遵循这些规范可以确保代码质量和团队协作的一致性！ ✨ 