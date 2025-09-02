import { useMemo } from 'react';

export const useBrowserDetection = () => {
  const browserInfo = useMemo(() => {
    const userAgent = navigator.userAgent.toLowerCase();

    const isSafari = /safari/.test(userAgent) && !/chrome/.test(userAgent);
    const isChrome = /chrome/.test(userAgent) && !/edg/.test(userAgent);
    const isFirefox = /firefox/.test(userAgent);
    const isEdge = /edg/.test(userAgent);
    const isMobile = /mobile|android|iphone|ipad/.test(userAgent);

    return {
      isSafari,
      isChrome,
      isFirefox,
      isEdge,
      isMobile,
      userAgent,
    };
  }, []);

  const getPrintTip = () => {
    const { isSafari, isChrome, isFirefox, isMobile } = browserInfo;

    if (isMobile) {
      return {
        tip: '💡 移动端建议在电脑上打开此页面进行打印或保存PDF',
        shortcut: '',
      };
    }

    if (isSafari) {
      return {
        tip: '💡 Safari用户：点击打印按钮，在打印对话框中选择"另存为PDF"',
        shortcut: 'Cmd+P',
      };
    }

    if (isChrome) {
      return {
        tip: '💡 Chrome用户：点击打印按钮，目标打印机选择"另存为PDF"',
        shortcut: 'Ctrl+P (Cmd+P)',
      };
    }

    if (isFirefox) {
      return {
        tip: '💡 Firefox用户：点击打印按钮，在打印对话框底部选择"保存为PDF"',
        shortcut: 'Ctrl+P (Cmd+P)',
      };
    }

    // 默认提示
    return {
      tip: '💡 点击打印按钮或使用快捷键打印简历，可选择保存为PDF',
      shortcut: 'Ctrl+P (Cmd+P)',
    };
  };

  return {
    ...browserInfo,
    getPrintTip,
  };
};
