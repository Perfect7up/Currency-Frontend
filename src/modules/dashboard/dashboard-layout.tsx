// src/layouts/DashboardLayout.tsx
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
          colorPrimary: '#00d1ff',
          borderRadius: 12,
        },
        // ADD THIS SECTION: Explicitly fix Menu colors for Dark Mode
        components: {
          Menu: {
            itemBg: 'transparent',
            itemColor: isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.85)',
            itemHoverColor: isDark ? '#ffffff' : '#00d1ff',
            itemSelectedColor: '#00d1ff',
            itemSelectedBg: 'rgba(0, 209, 255, 0.1)',
            itemActiveBg: 'rgba(255, 255, 255, 0.05)',
          },
        },
      }}
    >
      <Layout className="min-h-screen bg-[#f8fafc] dark:bg-[#020817]">
        {/* Pass isDark to Sidebar if needed, but removing theme="light" is the key */}
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} isDark={isDark} />

        <Layout className="bg-transparent transition-all duration-300 ease-in-out">
          <DashboardNavbar themeMode={themeMode} setThemeMode={setThemeMode} isDark={isDark} />
          <Content className="p-6 lg:p-10">
            <div className="mx-auto max-w-7xl">
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default DashboardLayout;
