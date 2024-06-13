import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { Request } from 'express';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy, 'api-key') {
  constructor(private readonly authService: AuthenticationService) {
    super();
  }

  async validate(request: Request, done: Function) {
    const apiKey = request.headers['x-api-key'] as string;
    if (!apiKey) {
      return done(new UnauthorizedException(), false);
    }

    const user = await this.authService.validateUser(apiKey);
    if (!user) {
      return done(new UnauthorizedException(), false);
    }

    const selectedProvider = await this.authService.validateProvider(apiKey);
    if (!selectedProvider) {
      return done(new UnauthorizedException(), false);
    }

    (request as any).provider = selectedProvider;
    return done(null, user);
  }
}
