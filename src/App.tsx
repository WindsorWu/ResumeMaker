import { Provider } from 'jotai';
import React, { Suspense, useEffect } from 'react';
import { Route, HashRouter as Router, Routes, useLocation } from 'react-router-dom';
import { GlobalErrorProvider } from './components/ui/GlobalErrorProvider';
import { MainPage } from './pages/MainPage';

// 懒加载预览页面（无loading，包太小会一闪而过）
const PreviewPage = React.lazy(() =>
  import('./pages/PreviewPage').then((module) => ({ default: module.PreviewPage }))
);

// 将 GA ID 放在此处（用户提供的 ID），也支持通过 VITE_GA_ID 环境变量覆盖
const GA_ID: string = (import.meta as any).env?.VITE_GA_ID || 'G-5ERTHDBFTD';

function Analytics() {
  const location = useLocation();

  useEffect(() => {
    if (!GA_ID) return;
    import('./lib/analytics').then(({ initGtag }) => {
      initGtag(GA_ID);
    });
  }, []);

  useEffect(() => {
    if (!GA_ID) return;
    import('./lib/analytics').then(({ pageview }) => {
      const path = location.pathname + location.search + location.hash;
      pageview(path);
    });
  }, [location]);

  return null;
}

function App() {
  return (
    <Provider>
      <GlobalErrorProvider>
        {/* 使用 HashRouter，避免 GitHub Pages 对子路径返回 404 */}
        <Router>
          <Analytics />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route
              path="/preview"
              element={
                <Suspense fallback={null}>
                  <PreviewPage />
                </Suspense>
              }
            />
          </Routes>
        </Router>
      </GlobalErrorProvider>
    </Provider>
  );
}

export default App;
