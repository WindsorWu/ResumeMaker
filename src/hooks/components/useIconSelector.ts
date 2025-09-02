/**
 * 图标选择器业务逻辑 Hook
 */
import { availableIcons } from '@/config/icons';
import { useMemo, useState } from 'react';

export const useIconSelector = (initialEnabled = true) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isIconEnabled, setIsIconEnabled] = useState(initialEnabled);

  // 过滤图标
  const filteredIcons = useMemo(() => {
    return availableIcons.filter((icon) =>
      icon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // 清空搜索
  const clearSearch = () => {
    setSearchTerm('');
  };

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
    searchTerm,
    filteredIcons,
    hasResults: filteredIcons.length > 0,
    isIconEnabled,

    // 操作方法
    setSearchTerm,
    clearSearch,
    toggleIconEnabled,
    enableIcon,
    disableIcon,
  };
};
