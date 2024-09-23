import {
  BadRequestException,
  Inject,
  Injectable,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import {
  CreateApiKeyDto,
  GetApiKeysWrapperResponseDto,
  PostApiKeyRequestDto,
  PostApiKeyResponseDto,
} from '../dto/api-key.dto';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { Request } from 'express';
import { randomUUID } from 'crypto';
import { REQUEST } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { getApiKeyFromRequest } from 'src/common/utils';
import { ApiKeyRepository } from '../repositories/api-key.repository';
import { AUTH_HEADERS } from 'src/authentication/constants/api-key-permissions.constant';

@Injectable({ scope: Scope.REQUEST })
export class ApiKeyService {
  constructor(
    @Inject(REQUEST) private readonly _request: Request,
    private readonly _apiKeyRepository: ApiKeyRepository,
    private readonly _configService: ConfigService,
  ) {}

  async findAll(): Promise<GetApiKeysWrapperResponseDto> {
    const apiKey = getApiKeyFromRequest(this._request);
    const userId = await this.getUserId(apiKey, this._request);

    return {
      data: (await this._apiKeyRepository.findAllByUserId(userId)).map(
        (apiKey) => {
          return {
            id: apiKey._id?.toString(),
            name: apiKey.name,
            created_at: apiKey.createdAt,
            permission: apiKey.permission,
          };
        },
      ),
    };
  }

  async createApiKey(
    payload: PostApiKeyRequestDto,
  ): Promise<PostApiKeyResponseDto> {
    const token = randomUUID();
    const apiKey = getApiKeyFromRequest(this._request);
    const userId = await this.getUserId(apiKey, this._request);

    const dto: CreateApiKeyDto = {
      ...payload,
      token: await bcrypt.hash(token, 10),
      userId: userId,
    };

    const apiKeyDocument = await this._apiKeyRepository.create(dto);

    return { id: apiKeyDocument._id?.toString(), token: token };
  }

  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid API key ID');
    }
    const apiKey = getApiKeyFromRequest(this._request);
    const userId = await this.getUserId(apiKey, this._request);

    return this._apiKeyRepository.findByIdAndUserAndDelete(id, userId);
  }

  async getUserId(apiKey: string, request: Request): Promise<string> {
    if (await this.isWebAppApiKey(apiKey)) {
      console.info('is apikey web app....');
      return this.getUserIdFromRequest(request);
    } else {
      console.info('isnt apikey web app....');
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
    const userId = request.headers[AUTH_HEADERS.USER_ID] as string;
    if (!userId) {
      console.log('userid not found in header ....');
      throw new BadRequestException(
        'User ID is missing in the request headers',
      );
    }
    console.log('userid is: ', userId);
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
