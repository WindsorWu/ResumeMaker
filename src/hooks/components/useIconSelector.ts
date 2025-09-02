/**
 * 图标选择器业务逻辑 Hook
 */
import { availableIcons } from '@/config/icons';
import { useMemo, useState } from 'react';

export const useIconSelector = () => {
  const [searchTerm, setSearchTerm] = useState('');

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

  return {
    // 状态
    searchTerm,
    filteredIcons,
    hasResults: filteredIcons.length > 0,

    // 操作方法
    setSearchTerm,
    clearSearch,
  };
};
