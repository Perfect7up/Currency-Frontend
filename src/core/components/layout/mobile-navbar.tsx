import React from 'react';
import { Drawer, Menu } from 'antd';
import { Link as RouterLink } from 'react-router-dom';
import { menuItems, resourceMenuItems } from '../../data/nav-data';

interface MobileNavbarProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  currentPath: string;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ isOpen, onClose, isDark, currentPath }) => {
  // Format resource items for Ant Design Menu
  const formattedResources = resourceMenuItems.map((res) => ({
    key: res.path,
    label: <RouterLink to={res.path}>{res.label}</RouterLink>,
  }));

  const items = menuItems.map((item) => ({
    key: item.path,
    label: item.isDropdown ? item.label : <RouterLink to={item.path}>{item.label}</RouterLink>,
    children: item.isDropdown ? formattedResources : null,
  }));

  return (
    <Drawer
      title={
        <span className="text-[11px] font-normal tracking-[0.2em] dark:text-white">NAVIGATION</span>
      }
      placement="right"
      onClose={onClose}
      open={isOpen}
      styles={{
        body: { padding: 0, background: isDark ? '#000' : '#fff' },
        header: {
          background: isDark ? '#000' : '#fff',
          borderBottom: isDark ? '1px solid #111' : '1px solid #f0f0f0',
        },
      }}
    >
      <Menu
        mode="inline"
        theme={isDark ? 'dark' : 'light'}
        selectedKeys={[currentPath]}
        onClick={onClose}
        items={items}
        className="border-none bg-transparent pt-4"
      />
    </Drawer>
  );
};

export default MobileNavbar;
