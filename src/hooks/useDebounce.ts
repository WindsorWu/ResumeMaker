import debounce from 'lodash.debounce';
import { useEffect, useMemo, useRef } from 'react';

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
