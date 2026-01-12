// src/components/layout/sidebar.tsx
import { Layout, Menu, Button, Typography, message } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  DashboardOutlined,
  WalletOutlined,
  SwapOutlined,
  HistoryOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useLogout } from '../../../account/hooks/use-auth';
import { useAuthStore } from '../../../account/store/auth.store';

const { Sider } = Layout;
const { Text } = Typography;

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  // Use the hook you provided
  const logoutMutation = useLogout();

  const handleLogout = async () => {
    try {
      // 1. Call API
      await logoutMutation.mutateAsync();
    } catch (err) {
      console.error('Logout API failed, clearing local session regardless');
    } finally {
      // 2. Clear local state
      clearAuth();
      message.success('Session terminated successfully');
      // 3. Redirect
      navigate('/login');
    }
  };

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: <Link to="/dashboard">Overview</Link>,
    },
    { key: '/dashboard/portfolio', icon: <WalletOutlined />, label: 'Portfolio' },
    { key: '/dashboard/trade', icon: <SwapOutlined />, label: 'Trade' },
    { key: '/dashboard/history', icon: <HistoryOutlined />, label: 'Activity' },
    { key: '/dashboard/settings', icon: <SettingOutlined />, label: 'Settings' },
  ];

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      className="fixed h-full border-r border-slate-200! bg-white! dark:border-white/5! dark:bg-[#000513]!"
      width={260}
    >
      <div className="flex h-20 items-center px-6">
        <Text className="text-xl! font-black! tracking-tighter dark:text-white!">
          CRYPTO<span className="text-[#00d1ff]">C</span>
        </Text>
      </div>

      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        className="border-none bg-transparent! px-3 dark:text-slate-400"
      />

      <div className="absolute bottom-8 w-full px-6">
        <Button
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          loading={logoutMutation.isPending}
          block
          danger
          type="text"
          className="flex items-center justify-center rounded-xl font-bold transition-all hover:bg-red-50 dark:hover:bg-red-500/10"
        >
          Sign Out
        </Button>
      </div>
    </Sider>
  );
};
