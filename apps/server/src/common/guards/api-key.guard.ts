import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector, REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { PERMISSION_KEY } from 'src/authentication/decorators/permission.decorator';
import { ApiKeyRepository } from 'src/authentication/repositories/api-key.repository';
import { getApiKeyFromContext } from '../utils/utils';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly reflector: Reflector,
    private readonly apiKeyRepository: ApiKeyRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const apiKey = getApiKeyFromContext(context);

    if (!apiKey) {
      throw new UnauthorizedException('API key is required');
    }

    const isValidApiKey = await this.validateApiKey(apiKey);

    if (!isValidApiKey) {
      throw new UnauthorizedException('Invalid API key');
    }

    const requiredPermission = this.reflector.get<string>(
      PERMISSION_KEY,
      context.getHandler(),
    );

    if (
      requiredPermission &&
      !(await this.hasPermission(apiKey, requiredPermission))
    ) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return true;
  }

  private async validateApiKey(apiKey: string): Promise<boolean> {
    const validApiKey = await this.apiKeyRepository.findOne(apiKey);
    return !!validApiKey;
  }

  private async hasPermission(
    apiKey: string,
    requiredPermission: string,
  ): Promise<boolean> {
    const apiKeyDocument = await this.apiKeyRepository.findOne(apiKey);
    return apiKeyDocument?.permission === requiredPermission;
  }
}
