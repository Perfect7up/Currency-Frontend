import createClient from 'openapi-fetch';
import type { paths } from '../../../../api/services/coins/coins';

export const coinsApiClient = createClient<paths>({
  baseUrl: import.meta.env.VITE_API_BASE_URL ?? 'https://localhost:7151',
});
