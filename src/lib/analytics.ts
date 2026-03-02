// 小型 analytics 封装（gtag / GA4）
// 用法：initGtag(measurementId) -> pageview(path) / trackEvent(name, params)
export function initGtag(measurementId: string) {
  if (!measurementId) return;
  // 已经注入则不重复注入
  if (document.querySelector(`script[data-gtag="${measurementId}"]`)) return;

  const s1 = document.createElement('script');
  s1.async = true;
  s1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  s1.setAttribute('data-gtag', measurementId);
  document.head.appendChild(s1);

  const inline = document.createElement('script');
  inline.setAttribute('data-gtag-inline', measurementId);
  inline.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    // 禁用自动 page_view，手动控制以适配 SPA/hash 路由
    gtag('config', '${measurementId}', { send_page_view: false });
  `;
  document.head.appendChild(inline);
}

export function pageview(path: string) {
  if (!(window as any).gtag) return;
  (window as any).gtag('event', 'page_view', {
    page_path: path,
  });
}

export function trackEvent(name: string, params?: Record<string, any>) {
  if (!(window as any).gtag) return;
  (window as any).gtag('event', name, params || {});
}
