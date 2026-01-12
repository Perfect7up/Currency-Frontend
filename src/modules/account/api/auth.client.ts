import createClient from 'openapi-fetch';
import type { paths } from '../../../api/services/auth/auth';

export const authApiClient = createClient<paths>({
  baseUrl: import.meta.env.VITE_API_BASE_URL_AUTH,
  headers: {
    'Content-Type': 'application/json',
  },
});
