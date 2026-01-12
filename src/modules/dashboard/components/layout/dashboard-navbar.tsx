import { useState, useEffect } from 'react';
import { Button, Typography, ConfigProvider, theme, Flex, Dropdown, Avatar, Space } from 'antd';
import {
  DesktopOutlined,
  MoonOutlined,
  SunOutlined,
  UserOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { useAuthStore } from '../../../account/store/auth.store';

const { Text } = Typography;

const DashboardNavbar = () => {
  const { user } = useAuthStore();
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
        token: { colorPrimary: '#00d1ff' },
      }}
    >
      <header className="sticky top-0 z-40 flex h-20 w-full items-center justify-between border-b border-slate-200 bg-white/80 px-8 backdrop-blur-md transition-all dark:border-white/5 dark:bg-[#000513]/80">
        <Flex align="center" gap={12}>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></span>
            <Text className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
              Terminal System <span className="text-emerald-500">Online</span>
            </Text>
          </div>
        </Flex>

        <Flex align="center" gap={24}>
          {/* Theme Dropdown matching your Public Navbar */}
          <Dropdown
            menu={{
              items: [
                { key: 'light', label: 'Light', icon: <SunOutlined /> },
                { key: 'dark', label: 'Dark', icon: <MoonOutlined /> },
                { key: 'system', label: 'System', icon: <DesktopOutlined /> },
              ],
              onClick: ({ key }) => setThemeMode(key),
              selectedKeys: [themeMode],
            }}
            trigger={['click']}
          >
            <Button
              type="text"
              shape="circle"
              className="hover:bg-slate-100! dark:hover:bg-white/5!"
              icon={
                isDark ? (
                  <MoonOutlined className="text-[#00d1ff]" />
                ) : (
                  <SunOutlined className="text-amber-500" />
                )
              }
            />
          </Dropdown>

          <Button
            type="text"
            shape="circle"
            icon={<BellOutlined className="dark:text-slate-400" />}
          />

          <Space size={12} className="border-l border-slate-200 pl-6 dark:border-white/10">
            <div className="hidden text-right leading-tight sm:block">
              <div className="text-sm font-bold dark:text-white">{user?.username || 'Trader'}</div>
              <div className="text-[9px] font-black tracking-widest text-slate-400 uppercase">
                Pro Tier
              </div>
            </div>
            <Avatar
              icon={<UserOutlined />}
              className="bg-slate-900 dark:bg-[#00d1ff] dark:text-black"
              size="large"
            />
          </Space>
        </Flex>
      </header>
    </ConfigProvider>
  );
};

export default DashboardNavbar;
