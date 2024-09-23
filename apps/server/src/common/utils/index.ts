import { Types } from 'mongoose';
import { Request } from 'express';
import { ExecutionContext } from '@nestjs/common';
import { ApiKeyRepository } from 'src/api-key/repositories/api-key.repository';
import { AUTH_HEADERS } from 'src/authentication/constants/api-key-permissions.constant';

function getRequest(context: ExecutionContext): Request {
  return context.switchToHttp().getRequest();
}

export function getApiKeyFromRequest(request: Request): string {
  const apiKey = request.headers[AUTH_HEADERS.API_KEY] as string | string[];
  if (Array.isArray(apiKey)) {
    return apiKey[0];
  }
  return apiKey;
}

export async function getApiKeyIdFromRequest(
  request: Request,
  apiKeyRepository: ApiKeyRepository,
): Promise<Types.ObjectId | undefined> {
  const apiKey = getApiKeyFromRequest(request);
  const apiKeyDocument = await apiKeyRepository.findOne(apiKey ?? '');
  return apiKeyDocument?._id;
}

export function getApiKeyFromContext(
  context: ExecutionContext,
): string | undefined {
  const request = getRequest(context);
  return getApiKeyFromRequest(request);
}
