import { ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Types } from 'mongoose';
import { AUTH_HEADERS } from 'src/authentication/constants/api-key-permissions.constant';
import { ApiKeyRepository } from 'src/authentication/repositories/api-key.repository';

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
