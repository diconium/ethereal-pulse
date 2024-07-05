export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthMiddlewareOptions {
  onErrorRedirectTo?: string;
}

export interface JWTPayload {
  userId: string;
}

export interface JWTVerifyResponse {
  success: boolean;
  data?: JWTPayload;
  error?: Error;
}
