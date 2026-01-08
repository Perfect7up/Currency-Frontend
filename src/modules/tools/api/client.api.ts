import createClient from 'openapi-fetch';
import type { paths } from '../../../api/services/tools/tools';

export const toolsApiClient = createClient<paths>({
  baseUrl: import.meta.env.VITE_API_BASE_URL_TOOLS,
});
