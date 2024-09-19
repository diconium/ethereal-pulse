import { Request } from 'express';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifiedCallback } from 'passport-custom';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AUTH_HEADERS } from '../constants/api-key-permissions.constant';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy, 'api-key') {
  constructor(private readonly _authService: AuthenticationService) {
    super();
  }

  async validate(request: Request, done: VerifiedCallback) {
    try {
      const apiKey = this.extractApiKey(request);
      const user = await this._authService.validateUser(apiKey, request);

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
}
