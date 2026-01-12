import { useState, useEffect } from 'react';
import { Button, Typography, ConfigProvider, theme, Flex, Dropdown, Image } from 'antd';
import { MenuOutlined, DesktopOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import { useLocation, Link as RouterLink, Link } from 'react-router-dom';

import DesktopNavbar from './desktop-navbar';
import MobileNavbar from './mobile-navbar';

const { Title } = Typography;

const Navbar = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [themeMode, setThemeMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'system';
    }
    return 'system';
  });
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

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
          borderRadius: 8,
          controlHeight: 48,
        },
      }}
    >
      <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/90 backdrop-blur-md transition-all duration-300 dark:border-[#0b1220] dark:bg-[#000513]/90">
        <div className="w-full px-6 lg:px-10">
          <Flex align="center" justify="space-between" className="h-24">
            <RouterLink to="/" className="group flex shrink-0 items-center gap-3">
              <Image
                src="/logo.png"
                alt="Logo"
                preview={false}
                height={55}
                className="transition-transform duration-500 group-hover:scale-110"
                style={{ filter: 'drop-shadow(0 0 10px rgba(0, 209, 255, 0.4))' }}
              />
              <Title
                level={3}
                className="m-0! hidden font-normal tracking-tight text-zinc-900! sm:block dark:text-white!"
              >
                CRYPTO<span className="text-[#00d1ff]">C</span>
              </Title>
            </RouterLink>

            <DesktopNavbar currentPath={location.pathname} />

            <div className="flex items-center gap-4 lg:gap-6">
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
                  className="hover:bg-zinc-100! dark:hover:bg-zinc-800!"
                  icon={
                    isDark ? (
                      <MoonOutlined className="text-white" />
                    ) : (
                      <SunOutlined className="text-zinc-900" />
                    )
                  }
                />
              </Dropdown>
              <div className="hidden md:block">
                <Link to="/login">
                  <Button
                    className="flex h-12 items-center justify-center rounded-full border-none bg-[#00d1ff] text-[12px] font-bold tracking-widest text-black shadow-[0_5px_15px_rgba(0,209,255,0.3)] transition-all hover:scale-105 hover:shadow-[0_8px_25px_rgba(0,209,255,0.5)] active:scale-95"
                    style={{
                      padding: '0 32px',
                      lineHeight: '48px',
                    }}
                  >
                    START TRADING
                  </Button>
                </Link>
              </div>

              <div className="block lg:hidden">
                <Button
                  type="text"
                  className="flex items-center justify-center p-0"
                  icon={<MenuOutlined className="text-2xl text-[#00d1ff]" />}
                  onClick={() => setDrawerVisible(true)}
                />
              </div>
            </div>
          </Flex>
        </div>

        <MobileNavbar
          isOpen={drawerVisible}
          onClose={() => setDrawerVisible(false)}
          isDark={isDark}
          currentPath={location.pathname}
        />
      </nav>
    </ConfigProvider>
  );
};

export default Navbar;
