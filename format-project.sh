#!/bin/bash

# 代码格式化脚本
# 使用方法: ./format-project.sh

echo "🚀 开始格式化项目代码..."

echo "📝 1. 运行 Prettier 格式化代码..."
npm run format

echo "🔧 2. 运行 ESLint 自动修复..."
npm run lint:fix

echo "🔍 3. 运行类型检查..."
npm run type-check

echo "✅ 4. 最终验证..."
if npm run lint && npm run format:check; then
    echo "🎉 项目格式化完成！所有检查通过。"
else
    echo "❌ 格式化过程中发现问题，请检查上面的错误信息。"
    exit 1
fi

echo "📊 项目统计信息:"
echo "  - TypeScript 文件: $(find src -name "*.ts" -o -name "*.tsx" | wc -l)"
echo "  - 组件文件: $(find src/components -name "*.tsx" | wc -l)"
echo "  - 总代码行数: $(find src -name "*.ts" -o -name "*.tsx" | xargs wc -l | tail -1)"
