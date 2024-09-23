import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { ApiKeyService } from 'src/api-key/services/api-key.service';

@Injectable({ scope: Scope.REQUEST })
export class AuthenticationService {
  constructor(
    @Inject(REQUEST) private readonly _request: Request,
    private readonly _apiKeyService: ApiKeyService,
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
    const userId = await this._apiKeyService.getUserId(apiKey, request);
    return Boolean(userId);
  }
}
