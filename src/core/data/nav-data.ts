export interface MenuItem {
  label: string;
  path: string;
  isDropdown?: boolean;
}

export interface ResourceItem {
  key: string;
  label: string;
  path: string;
}

export const menuItems: MenuItem[] = [
  { label: 'HOME', path: '/' },
  { label: 'ABOUT', path: '/about' },
  { label: 'RESOURCES', path: '/resources', isDropdown: true },
  { label: 'COINS', path: '/coins' },
  { label: 'TRADE', path: '/trade' },
];

export const resourceMenuItems: ResourceItem[] = [
  { key: 'faq', label: 'FAQ', path: '/faq' },
  { key: 'blogs', label: 'BLOGS', path: '/blogs' },
  { key: 'tools', label: 'Tools', path: '/tools' },
];
