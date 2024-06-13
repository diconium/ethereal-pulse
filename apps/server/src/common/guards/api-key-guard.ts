import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { REQUEST } from '@nestjs/core';
import { ApiKeyRepository } from '../../database/repositories/api-key.repository';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    @Inject(REQUEST) private readonly request,
    private readonly reflector: Reflector,
    private readonly apiKeyRepository: ApiKeyRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];

    if (!apiKey) {
      throw new UnauthorizedException('API key is required');
    }

    const validApiKey = await this.apiKeyRepository.findOne({ key: apiKey });

    if (!validApiKey) {
      throw new UnauthorizedException('Invalid API key');
    }

    return true;
  }
}
