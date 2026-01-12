import { Layout, Menu, Button, Typography, message } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  DashboardOutlined,
  WalletOutlined,
  SwapOutlined,
  HistoryOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useLogout } from '../../../account/hooks/use-auth';
import { useAuthStore } from '../../../account/store/auth.store';

const { Sider } = Layout;
const { Text } = Typography;

export const Sidebar = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  isDark: boolean;
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const logoutMutation = useLogout();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      clearAuth();
      message.success('Logged out successfully');
      navigate('/account/login');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined className="text-lg" />,
      label: <Link to="/dashboard">Overview</Link>,
    },
    {
      key: '/dashboard/portfolio',
      icon: <WalletOutlined className="text-lg" />,
      label: <Link to="/dashboard/portfolio">Portfolio</Link>,
    },
    {
      key: '/dashboard/trade',
      icon: <SwapOutlined className="text-lg" />,
      label: <Link to="/dashboard/trade">Trade</Link>,
    },
    {
      key: '/dashboard/history',
      icon: <HistoryOutlined className="text-lg" />,
      label: <Link to="/dashboard/history">Activity</Link>,
    },
    {
      key: '/dashboard/settings',
      icon: <SettingOutlined className="text-lg" />,
      label: <Link to="/dashboard/settings">Settings</Link>,
    },
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      width={260}
      collapsedWidth={80}
      className="sticky top-0 bottom-0 left-0 h-screen border-r border-slate-200 bg-white transition-all duration-300 ease-in-out dark:border-white/10 dark:bg-[#020817]!"
    >
      <div className="flex h-full flex-col">
        <div
          className={`flex h-20 items-center justify-between px-6 ${collapsed ? 'justify-center px-0' : ''}`}
        >
          {!collapsed && (
            <Text className="text-xl font-black tracking-tighter text-slate-900 dark:text-white">
              CRYPTO<span className="text-blue-500">C</span>
            </Text>
          )}
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="flex h-10 w-10 items-center justify-center text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/5"
          />
        </div>

        <div className="flex-1 overflow-x-hidden overflow-y-auto py-4">
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            className="border-none bg-transparent px-3 [&_.ant-menu-item]:rounded-xl [&_.ant-menu-item_a]:text-inherit!"
          />
        </div>

        <div className="p-4">
          <Button
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            loading={logoutMutation.isPending}
            danger
            type="text"
            block={!collapsed}
            className={`flex items-center rounded-xl transition-all hover:bg-red-50 dark:hover:bg-red-500/10 ${
              collapsed
                ? 'h-12 w-full justify-center'
                : 'h-12 justify-start gap-3 px-4 font-semibold'
            }`}
          >
            {!collapsed && <span>Sign Out</span>}
          </Button>
        </div>
      </div>
    </Sider>
  );
};
