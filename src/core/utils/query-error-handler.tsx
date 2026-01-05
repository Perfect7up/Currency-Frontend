import { notification } from 'antd';
import {
  BugOutlined,
  DisconnectOutlined,
  LockOutlined,
  FileSearchOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import type { GlobalError } from '../types';

const getStopIcon = () => (
  <span role="img" aria-label="stop" className="anticon">
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
      />
    </svg>
  </span>
);

export const handleGlobalError = (error: GlobalError) => {
  const status = error?.response?.status;
  const method = error?.config?.method?.toUpperCase() || 'REQUEST';

  // Helper to wrap text for dark mode support
  const formatText = (msg: string, desc: string) => ({
    message: <span className="font-bold dark:text-white!">{msg}</span>,
    description: <span className="dark:text-slate-400!">{desc}</span>,
  });

  // Default configuration (Unknown Error)
  let config = {
    ...formatText('API Error', 'An unexpected error occurred.'),
    icon: <WarningOutlined className="text-amber-500 dark:text-amber-400!" />,
    className: 'dark:bg-slate-900! dark:border-slate-800! border-l-4 border-amber-500',
  };

  if (status) {
    switch (status) {
      case 401:
        config = {
          ...formatText('Unauthorized', 'Your session has expired. Please log in again.'),
          icon: <LockOutlined className="text-rose-500 dark:text-rose-400!" />,
          className: 'dark:bg-slate-900! dark:border-slate-800! border-l-4 border-rose-500',
        };
        break;
      case 403:
        config = {
          ...formatText('Access Denied', "You don't have permission to access this resource."),
          icon: <span className="text-rose-500 dark:text-rose-400!">{getStopIcon()}</span>,
          className: 'dark:bg-slate-900! dark:border-slate-800! border-l-4 border-rose-500',
        };
        break;
      case 404:
        config = {
          ...formatText(
            'Resource Not Found',
            'The requested data could not be found on the server.',
          ),
          icon: <FileSearchOutlined className="text-blue-500 dark:text-blue-400!" />,
          className: 'dark:bg-slate-900! dark:border-slate-800! border-l-4 border-blue-500',
        };
        break;
      case 405:
        config = {
          ...formatText(
            'Method Not Allowed',
            `The ${method} request is not supported for this endpoint.`,
          ),
          icon: <BugOutlined className="text-orange-500 dark:text-orange-400!" />,
          className: 'dark:bg-slate-900! dark:border-slate-800! border-l-4 border-orange-500',
        };
        break;
      case 500:
      case 502:
      case 503:
      case 504:
        config = {
          ...formatText(
            `Server Error (${status})`,
            'The backend server is having trouble. Please try again later.',
          ),
          icon: <DisconnectOutlined className="text-rose-600 dark:text-rose-500!" />,
          className: 'dark:bg-slate-900! dark:border-slate-800! border-l-4 border-rose-600',
        };
        break;
    }
  } else if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
    config = {
      ...formatText(
        'Backend Offline',
        'Cannot connect to the server. Please check if the backend is running.',
      ),
      icon: <DisconnectOutlined className="text-rose-500 dark:text-rose-400!" />,
      className: 'dark:bg-slate-900! dark:border-slate-800! border-l-4 border-rose-500',
    };
  }

  notification.open({
    ...config,
    placement: 'bottomRight',
    duration: 6,
    closeIcon: <span className="dark:text-slate-400! hover:dark:text-white!">×</span>,
  });
};
