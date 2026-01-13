import { Button, Typography, Dropdown, Avatar } from 'antd';
import {
  DesktopOutlined,
  MoonOutlined,
  SunOutlined,
  UserOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { useAuthStore } from '../../../account/store/auth.store';

const { Text } = Typography;

interface DashboardNavbarProps {
  themeMode: string;
  setThemeMode: (mode: string) => void;
  isDark: boolean;
}

const DashboardNavbar = ({ themeMode, setThemeMode, isDark }: DashboardNavbarProps) => {
  const { user } = useAuthStore();

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md transition-all md:h-20 md:px-8 dark:border-white/5 dark:bg-[#000513]/80">
      <div className="flex items-center">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></span>
          <Text className="text-[9px] font-black tracking-widest text-slate-400 uppercase md:text-[10px]">
            <span className="xs:inline hidden">Terminal System </span>
            <span className="text-emerald-500">Online</span>
          </Text>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
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
            className="flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/5"
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
          className="xs:flex hidden items-center justify-center"
        />

        <div className="flex items-center gap-3 border-l border-slate-200 pl-3 md:pl-6 dark:border-white/10">
          <div className="hidden text-right leading-tight sm:block">
            <div className="max-w-30 truncate text-sm font-bold dark:text-white">
              {user?.username || 'Trader'}
            </div>
          </div>

          <Avatar
            icon={<UserOutlined />}
            className="flex h-8! w-8! shrink-0 items-center justify-center bg-slate-900 sm:h-10! sm:w-10! dark:bg-[#00d1ff] dark:text-black"
          />
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
