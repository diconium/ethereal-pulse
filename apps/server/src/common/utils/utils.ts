import { ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { AUTH_HEADERS } from 'src/authentication/constants/api-key-permissions.constant';

function getRequest(context: ExecutionContext): Request {
  return context.switchToHttp().getRequest();
}

export function getApiKeyFromRequest(request: Request): string | undefined {
  const apiKey = request.headers[AUTH_HEADERS.API_KEY];
  if (Array.isArray(apiKey)) {
    return apiKey[0];
  }
  return apiKey;
}

export function getApiKeyFromContext(
  context: ExecutionContext,
): string | undefined {
  const request = getRequest(context);
  return getApiKeyFromRequest(request);
}
