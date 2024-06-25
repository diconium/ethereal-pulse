import { Request } from 'express';
import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AUTH_HEADERS } from '../constants/api-key-permissions.contant';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy, 'api-key') {
  constructor(private readonly authService: AuthenticationService) {
    super();
  }

  async validate(request: Request, done: Function) {
    try {
      const apiKey = this.extractApiKey(request);
      const user = await this.authService.validateUser(apiKey);
      const selectedProvider = await this.authService.validateProvider(apiKey);

      this.attachProviderToRequest(request, selectedProvider);
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }

  private extractApiKey(request: Request): string {
    const apiKey = request.headers[AUTH_HEADERS.API_KEY] as string;
    if (!apiKey) {
      throw new UnauthorizedException('API key is missing');
    }
    return apiKey;
  }

  private attachProviderToRequest(request: Request, provider: any): void {
    if (!provider) {
      throw new UnauthorizedException('Provider validation failed');
    }
    (request as any).provider = provider;
  }
}
