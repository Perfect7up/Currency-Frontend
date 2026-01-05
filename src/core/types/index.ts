export interface GlobalError {
  response?: {
    status: number;
    data?: unknown;
  };
  config?: {
    method?: string;
    url?: string;
  };
  message?: string;
  code?: string;
}
