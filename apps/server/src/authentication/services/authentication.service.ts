import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/database/schemas/user.schema';
import { ApiKeyRepository } from '../repositories/api-key.repository';
import { UserRepository } from 'src/user/repositories/user.repository';
import { ERROR_MESSAGES } from 'src/common/constants/error-messages-constants';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _apiKeyRepository: ApiKeyRepository,
    private readonly _configService: ConfigService, // Inject ConfigService
  ) {}

  /**
   * Validates a user based on the provided API key.
   * @param {string} apiKey - The API key to validate.
   * @param {Request} request - The request object to extract userId if needed.
   * @returns {Promise<User | null>} - The validated user or null if not found.
   * @throws {UnauthorizedException} - If the user is not found.
   */
  async validateUser(apiKey: string, request: Request): Promise<User | null> {
    const userId = await this.getUserId(apiKey, request);
    return this.getUserById(userId);
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
      throw new UnauthorizedException(ERROR_MESSAGES.WEBAPP_API_KEY_NOT_SET);
    }
    return bcrypt.compare(apiKey, webAppApiKey);
  }

  private getUserIdFromRequest(request: Request): string {
    const userId = request.headers['user-id'] as string;
    if (!userId) {
      throw new BadRequestException(ERROR_MESSAGES.USER_ID_MISSING_IN_HEADERS);
    }
    return userId;
  }

  private async getUserIdFromApiKey(apiKey: string): Promise<string> {
    const userId = await this._apiKeyRepository.findUserIdByApiKey(apiKey);
    if (!userId) {
      throw new UnauthorizedException();
    }
    return userId;
  }

  private async getUserById(userId: string): Promise<User | null> {
    const user = await this._userRepository.findById(userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
