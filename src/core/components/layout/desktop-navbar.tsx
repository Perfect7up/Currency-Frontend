import React from 'react';
import { Flex, Typography, Dropdown, Divider } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Link as RouterLink } from 'react-router-dom';
import { menuItems, resourceMenuItems } from '../../data/nav-data';

const { Text } = Typography;

interface DesktopNavbarProps {
  currentPath: string;
}

const DesktopNavbar: React.FC<DesktopNavbarProps> = ({ currentPath }) => {
  const resourceMenu = {
    items: resourceMenuItems.map((item) => ({
      key: item.key,
      label: <RouterLink to={item.path}>{item.label}</RouterLink>,
    })),
  };

  return (
    <div className="hidden flex-1 items-center justify-center px-4 lg:flex">
      <Flex align="center">
        {menuItems.map((item, index) => (
          <React.Fragment key={item.label}>
            {item.isDropdown ? (
              <Dropdown menu={resourceMenu} placement="bottomCenter">
                <div className="group cursor-pointer px-6">
                  <Text className="text-[11px] font-normal tracking-[0.2em] text-zinc-500 transition-colors group-hover:text-[#00d1ff] dark:text-zinc-400">
                    {item.label} <DownOutlined className="ml-1 text-[9px]" />
                  </Text>
                </div>
              </Dropdown>
            ) : (
              <RouterLink to={item.path} className="group relative px-6">
                <Text
                  className={`text-[11px] font-normal tracking-[0.2em] transition-colors duration-300 ${
                    currentPath === item.path
                      ? 'text-[#00d1ff]'
                      : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </Text>
                {currentPath === item.path && (
                  <span className="absolute -bottom-2 left-1/2 h-px w-4 -translate-x-1/2 bg-[#00d1ff]" />
                )}
              </RouterLink>
            )}
            {index !== menuItems.length - 1 && (
              <Divider type="vertical" className="h-3 border-zinc-200 dark:border-zinc-800" />
            )}
          </React.Fragment>
        ))}
      </Flex>
    </div>
  );
};

export default DesktopNavbar;
