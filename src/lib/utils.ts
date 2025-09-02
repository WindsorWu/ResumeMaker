import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useState, useEffect, useMemo, useRef } from 'react';
import debounce from 'lodash.debounce';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 防抖值变化的 Hook
 * @param value 需要防抖的值
 * @param delay 延迟时间（毫秒）
 * @returns 防抖后的值
 */
export const useDebounceValue = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * 防抖回调函数的 Hook（使用 lodash.debounce）
 * @param callback 需要防抖的回调函数
 * @param delay 延迟时间（毫秒）
 * @returns 防抖后的回调函数
 */
export const useDebounceCallback = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number
) => {
  const callbackRef = useRef(callback);

  // 更新 ref 中的回调函数，但不重新创建 debounce 函数
  useEffect(() => {
    callbackRef.current = callback;
  });

  const debouncedCallback = useMemo(
    () => debounce((...args: T) => callbackRef.current(...args), delay),
    [delay] // 只依赖 delay，不依赖 callback
  );

  useEffect(() => {
    return () => {
      debouncedCallback.cancel();
    };
  }, [debouncedCallback]);

  return debouncedCallback;
};
