import { Request } from 'express';
import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AUTH_HEADERS } from '../constants/api-key-permissions.constant';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy, 'api-key') {
  constructor(private readonly _authService: AuthenticationService) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async validate(request: Request, done: Function) {
    try {
      const apiKey = this.extractApiKey(request);
      const user = await this._authService.validateUser(apiKey);
      const selectedProvider = null; // TODO: GET PROVIDER ENV

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
