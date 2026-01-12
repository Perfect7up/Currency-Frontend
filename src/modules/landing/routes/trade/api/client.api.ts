import createClient from 'openapi-fetch';
import type { paths } from '../../../../../api/services/trade/trade';

export const tradeApiClient = createClient<paths>({
  baseUrl: import.meta.env.VITE_API_BASE_URL_TRADE,
});
