/**
 * 图标选择器业务逻辑 Hook - 简化版本
 * 只提供基本的状态管理功能
 */
import { useState } from 'react';

export const useIconSelector = (initialEnabled = true) => {
  const [isIconEnabled, setIsIconEnabled] = useState(initialEnabled);

  // 切换图标启用状态
  const toggleIconEnabled = () => {
    setIsIconEnabled(!isIconEnabled);
  };

  // 启用图标
  const enableIcon = () => {
    setIsIconEnabled(true);
  };

  // 禁用图标
  const disableIcon = () => {
    setIsIconEnabled(false);
  };

  return {
    // 状态
    isIconEnabled,

    // 操作方法
    toggleIconEnabled,
    enableIcon,
    disableIcon,
  };
};
