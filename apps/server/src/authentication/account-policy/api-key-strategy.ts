import { Request } from 'express';
import { PassportStrategy } from '@nestjs/passport';
import { getApiKeyFromRequest } from 'src/common/utils';
import { Strategy, VerifiedCallback } from 'passport-custom';
import { Injectable, UnauthorizedException } from '@nestjs/common';
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
    const apiKey = getApiKeyFromRequest(request);
    if (!apiKey) {
      throw new UnauthorizedException('API key is missing');
    }
    return apiKey;
  }
}
