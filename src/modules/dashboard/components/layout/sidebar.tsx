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
  LoadingOutlined,
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
      icon: <DashboardOutlined />,
      label: <Link to="/dashboard">Overview</Link>,
    },
    {
      key: '/dashboard/portfolio',
      icon: <WalletOutlined />,
      label: <Link to="/dashboard/portfolio">Portfolio</Link>,
    },
    {
      key: '/dashboard/trade',
      icon: <SwapOutlined />,
      label: <Link to="/dashboard/trade">Trade</Link>,
    },
    {
      key: '/dashboard/history',
      icon: <HistoryOutlined />,
      label: <Link to="/dashboard/history">Activity</Link>,
    },
    {
      key: '/dashboard/settings',
      icon: <SettingOutlined />,
      label: <Link to="/dashboard/settings">Settings</Link>,
    },
  ];

  return (
    <>
      <Sider
        collapsible
        collapsed={collapsed}
        trigger={null}
        width={260}
        collapsedWidth={80}
        className="hidden border-r border-slate-200 bg-white md:block dark:border-white/10 dark:bg-[#020817]!"
      >
        <div className="flex h-full flex-col">
          <div
            className={`flex h-20 items-center px-6 ${collapsed ? 'justify-center px-0' : 'justify-between'}`}
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
              className="flex h-9 w-9 items-center justify-center text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/5"
            />
          </div>

          <div className="flex-1 overflow-x-hidden overflow-y-auto py-2">
            <Menu
              mode="inline"
              selectedKeys={[location.pathname]}
              items={menuItems}
              className="border-none bg-transparent px-3 [&_.ant-menu-item-selected]:bg-blue-50! [&_.ant-menu-item-selected]:text-blue-600! dark:[&_.ant-menu-item-selected]:bg-blue-500/10! dark:[&_.ant-menu-item-selected]:text-blue-400!"
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

      <nav className="fixed right-0 bottom-0 left-0 z-50 flex h-16 items-center justify-around border-t border-slate-200 bg-white/95 px-1 backdrop-blur-lg md:hidden dark:border-white/10 dark:bg-[#020817]/90">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.key;
          return (
            <Link
              key={item.key}
              to={item.key}
              className={`flex flex-1 flex-col items-center justify-center py-2 transition-all ${
                isActive ? 'text-blue-500' : 'text-slate-400 dark:text-slate-500'
              }`}
            >
              <span className={`text-xl ${isActive ? 'scale-110' : ''}`}>{item.icon}</span>
              {isActive && <span className="mt-1 h-1 w-1 rounded-full bg-blue-500" />}
            </Link>
          );
        })}

        <button
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
          className="flex flex-1 flex-col items-center justify-center py-2 text-red-500 transition-all active:scale-95 dark:text-red-400"
        >
          {logoutMutation.isPending ? (
            <LoadingOutlined className="text-xl" />
          ) : (
            <LogoutOutlined className="text-xl" />
          )}
          <span className="mt-1 h-1 w-1 opacity-0" />
        </button>
      </nav>

      <div className="h-16 md:hidden" />
    </>
  );
};
