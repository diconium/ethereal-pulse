import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { getApiKeyFromContext } from '../utils';
import { ApiKeyRepository } from 'src/api-key/repositories/api-key.repository';
import { PERMISSION_KEY } from 'src/authentication/decorators/permission.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly _reflector: Reflector,
    private readonly _apiKeyRepository: ApiKeyRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const apiKey = getApiKeyFromContext(context);
    if (!apiKey) {
      throw new UnauthorizedException('API key is required');
    }

    await this.validateApiKeyOrThrow(apiKey);
    await this.checkPermissionsOrThrow(context, apiKey);

    return true;
  }

  private async validateApiKeyOrThrow(apiKey: string): Promise<void> {
    const isValidApiKey = await this.validateApiKey(apiKey);
    if (!isValidApiKey) {
      throw new UnauthorizedException('Invalid API key');
    }
  }

  private async checkPermissionsOrThrow(
    context: ExecutionContext,
    apiKey: string,
  ): Promise<void> {
    const requiredPermission = this._reflector.get<string>(
      PERMISSION_KEY,
      context.getHandler(),
    );

    if (
      requiredPermission &&
      !(await this.hasPermission(apiKey, requiredPermission))
    ) {
      throw new ForbiddenException('Insufficient permissions');
    }
  }

  private async validateApiKey(apiKey: string): Promise<boolean> {
    const validApiKey = await this._apiKeyRepository.findOne(apiKey);
    return !!validApiKey;
  }

  private async hasPermission(
    apiKey: string,
    requiredPermission: string,
  ): Promise<boolean> {
    const apiKeyDocument = await this._apiKeyRepository.findOne(apiKey);
    return apiKeyDocument?.permission === requiredPermission;
  }
}
