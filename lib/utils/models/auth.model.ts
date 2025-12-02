export interface ApiResponseType<T> {
  message: string;
  data: T;
}

export interface AuthRequestParams<D = unknown> {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  data?: D;
  headers?: Record<string, string>;
}

export interface ErrorData {
  message: string;
  code?: string;
  details?: unknown;
}

export interface SessionData {
  token: string;
  userId: string;
  email?: string;
  expiresAt?: string;
}
