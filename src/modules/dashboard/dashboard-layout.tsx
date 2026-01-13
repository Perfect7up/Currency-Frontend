import { useState, useEffect } from 'react';
import { Layout, ConfigProvider, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './components/layout/sidebar';
import DashboardNavbar from './components/layout/dashboard-navbar';

const { Content } = Layout;

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [themeMode, setThemeMode] = useState(() => localStorage.getItem('theme') || 'system');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      let activeDark = false;
      if (themeMode === 'dark') activeDark = true;
      else if (themeMode === 'light') activeDark = false;
      else activeDark = mediaQuery.matches;

      setIsDark(activeDark);
      if (activeDark) root.classList.add('dark');
      else root.classList.remove('dark');
      localStorage.setItem('theme', themeMode);
    };

    applyTheme();
    const handler = () => {
      if (themeMode === 'system') applyTheme();
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [themeMode]);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#3b82f6',
          borderRadius: 12,
          colorBgContainer: isDark ? '#020817' : '#ffffff',
          colorTextBase: isDark ? '#ffffff' : '#0f172a',
        },
        components: {
          Menu: {
            itemBg: 'transparent',
            itemColor: isDark ? '#94a3b8' : '#64748b',
            itemSelectedColor: '#3b82f6',
            itemHoverBg: isDark ? 'rgba(255, 255, 255, 0.05)' : '#f1f5f9',
            itemActiveBg: 'transparent',
          },
          Layout: {
            siderBg: isDark ? '#020817' : '#ffffff',
            headerBg: isDark ? '#020817' : '#ffffff',
          },
        },
      }}
    >
      <Layout hasSider className="min-h-screen bg-slate-50 dark:bg-[#020817]">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

        <Layout className="bg-transparent">
          <DashboardNavbar themeMode={themeMode} setThemeMode={setThemeMode} isDark={isDark} />
          <Content className="p-4 md:p-6 lg:p-10">
            <div className="mx-auto max-w-7xl pb-20 md:pb-0">
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default DashboardLayout;
