import createClient from 'openapi-fetch';
import type { paths } from '../../../../api/services/market/market';

export const marketApiClient = createClient<paths>({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
});
