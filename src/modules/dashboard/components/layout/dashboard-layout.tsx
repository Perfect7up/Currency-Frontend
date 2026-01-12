// src/components/layout/dashboard-layout.tsx
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './sidebar';
import DashboardNavbar from './dashboard-navbar';

const { Content } = Layout;

const DashboardLayout = () => {
  return (
    <Layout className="min-h-screen bg-[#f8fafc] dark:bg-[#000513]">
      <Sidebar />

      <Layout className="ml-0 bg-transparent lg:ml-[260px]">
        <DashboardNavbar />
        <Content className="p-8">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
