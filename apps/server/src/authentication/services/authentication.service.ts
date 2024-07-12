import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ApiKeyRepository } from '../repositories/api-key.repository';
import { UserRepository } from 'src/user/repositories/user.repository';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _apiKeyRepository: ApiKeyRepository,
  ) {}

  /**
   * Validates a user based on the provided API key.
   * @param {string} apiKey - The API key to validate.
   * @returns {Promise<any>} - The validated user.
   * @throws {UnauthorizedException} - If the user is not found.
   */
  async validateUser(apiKey: string): Promise<any> {
    const userID = await this.getUserIdFromApiKey(apiKey);
    const user = await this._userRepository.findById(userID);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  /**
   * Retrieves the user ID associated with the provided API key.
   * @param {string} apiKey - The API key to validate.
   * @returns {Promise<string>} - The user ID.
   * @throws {UnauthorizedException} - If the API key is invalid.
   */
  private async getUserIdFromApiKey(apiKey: string): Promise<string> {
    const userID = await this._apiKeyRepository.findUserIdByApiKey(apiKey);
    if (!userID) {
      throw new UnauthorizedException();
    }
    return userID;
  }
}
