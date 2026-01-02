import createClient from 'openapi-fetch';
import type { paths } from '../../../api/services/market/market';

export const api = createClient<paths>({
  baseUrl: import.meta.env.VITE_API_BASE_URL ?? 'https://localhost:7151',
});
