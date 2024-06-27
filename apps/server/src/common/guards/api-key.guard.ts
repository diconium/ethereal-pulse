import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { Reflector, REQUEST } from '@nestjs/core';
import { PERMISSION_KEY } from 'src/authentication/decorators/permission.decorator';
import { ApiKeyRepository } from 'src/authentication/repositories/api-key.repository';
import { AUTH_HEADERS } from 'src/authentication/constants/api-key-permissions.constant';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly reflector: Reflector,
    private readonly apiKeyRepository: ApiKeyRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = this.getRequest(context);
    const apiKey = this.getApiKeyFromHeaders(request);

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

  private getRequest(context: ExecutionContext): Request {
    return context.switchToHttp().getRequest();
  }

  private getApiKeyFromHeaders(request: Request): string | undefined {
    const apiKey = request.headers[AUTH_HEADERS.API_KEY];
    if (Array.isArray(apiKey)) {
      return apiKey[0];
    }
    return apiKey;
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
