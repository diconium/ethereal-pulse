import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { ApiKeyRepository } from '../repositories/api-key.repository';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly _apiKeyRepository: ApiKeyRepository,
    private readonly _configService: ConfigService,
  ) {}

  /**
   * Validates a user based on the provided API key.
   * @param {string} apiKey - The API key to validate.
   * @param {Request} request - The request object to extract userId if needed.
   * @returns {Promise<boolean>} - True if the user is validated, otherwise false.
   * @throws {UnauthorizedException} - If the user or WEBAPP_API_KEY is not found/setted.
   * @throws {BadRequestException} - If the user ID is missing in the request headers.
   */
  async validateUser(apiKey: string, request: Request): Promise<boolean> {
    const userId = await this.getUserId(apiKey, request);
    return Boolean(userId);
  }

  private async getUserId(apiKey: string, request: Request): Promise<string> {
    if (await this.isWebAppApiKey(apiKey)) {
      return this.getUserIdFromRequest(request);
    } else {
      return this.getUserIdFromApiKey(apiKey);
    }
  }

  private async isWebAppApiKey(apiKey: string): Promise<boolean> {
    const webAppApiKey = this._configService.get<string>('webapp.apiKey');
    if (!webAppApiKey) {
      throw new UnauthorizedException('WEBAPP_API_KEY is not set');
    }
    return apiKey === webAppApiKey;
  }

  private getUserIdFromRequest(request: Request): string {
    const userId = request.headers['user-id'] as string;
    if (!userId) {
      throw new BadRequestException(
        'User ID is missing in the request headers',
      );
    }
    return userId;
  }

  private async getUserIdFromApiKey(apiKey: string): Promise<string> {
    const userId = await this._apiKeyRepository.findUserIdByApiKey(apiKey);
    if (!userId) {
      throw new UnauthorizedException(
        'Invalid API Key: User ID not found for the provided API key',
      );
    }
    return userId;
  }
}
