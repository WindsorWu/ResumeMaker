/**
 * 简化的图标输入组件
 * 只提供输入框和图标验证功能
 */
import { DynamicIcon } from '@/components/DynamicIcon';
import { Input } from '@/components/ui/input';
import { isValidIconName } from '@/lib/iconUtils';
import { useState } from 'react';

interface SimpleIconInputProps {
  value: string;
  onChange: (iconName: string) => void;
  placeholder?: string;
  label?: string;
}

export const SimpleIconInput = ({
  value,
  onChange,
  placeholder = '输入图标名称，如 heart, star, user...',
  label = '图标',
}: SimpleIconInputProps) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (newValue: string) => {
    setInputValue(newValue);
    onChange(newValue);
  };

  const isValid = !inputValue || isValidIconName(inputValue);

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}

      <div className="flex items-center gap-2">
        <Input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
          className={`flex-1 ${!isValid ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
        />

        {/* 图标预览 */}
        {inputValue && (
          <div
            className={`flex items-center justify-center w-10 h-10 border rounded-md ${
              isValid ? 'bg-gray-50 border-gray-200' : 'bg-red-50 border-red-200'
            }`}
          >
            {isValid ? (
              <DynamicIcon name={inputValue} className="h-5 w-5 text-gray-600" />
            ) : (
              <span className="text-red-500 text-xs">!</span>
            )}
          </div>
        )}
      </div>

      {/* 错误提示 */}
      {inputValue && !isValid && (
        <p className="text-sm text-red-500">图标 "{inputValue}" 不存在，请检查名称是否正确</p>
      )}

      {/* 帮助提示 */}
      {!inputValue && (
        <p className="text-xs text-gray-500">
          访问{' '}
          <a
            href="https://lucide.dev/icons/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Lucide 官网
          </a>{' '}
          查看所有可用图标
        </p>
      )}
    </div>
  );
};
