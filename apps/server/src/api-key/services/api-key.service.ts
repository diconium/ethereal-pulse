import { BadRequestException, Inject, Injectable, Scope } from '@nestjs/common';
import {
  CreateApiKeyDto,
  GetApiKeysWrapperResponseDto,
  PostApiKeyRequestDto,
  PostApiKeyResponseDto,
} from '../dto/api-key.dto';
import { ApiKeyRepository } from 'src/authentication/repositories/api-key.repository';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { Types } from 'mongoose';
import { getApiKeyFromRequest } from 'src/common/utils/utils';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class ApiKeyService {
  constructor(
    @Inject(REQUEST) private readonly _request: Request,
    private readonly _apiKeyRepository: ApiKeyRepository,
  ) {}

  async findAll(): Promise<GetApiKeysWrapperResponseDto> {
    const userId = await this.getUserId();

    return {
      data: (await this._apiKeyRepository.findAllByUserId(userId)).map(
        (apiKey) => {
          return {
            id: apiKey._id?.toString(),
            name: apiKey.name,
            created_at: apiKey.createdAt,
          };
        },
      ),
    };
  }

  async createApiKey(
    payload: PostApiKeyRequestDto,
  ): Promise<PostApiKeyResponseDto> {
    const token = randomUUID();

    const dto: CreateApiKeyDto = {
      ...payload,
      token: await bcrypt.hash(token, 10),
      userId: await this.getUserId(),
    };

    const apiKeyDocument = await this._apiKeyRepository.create(dto);

    return { id: apiKeyDocument._id?.toString(), token: token };
  }

  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid API key ID');
    }
    return this._apiKeyRepository.findByIdAndUserAndDelete(
      id,
      await this.getUserId(),
    );
  }

  private async getUserId(): Promise<string> {
    const userId = await this._apiKeyRepository.findUserIdByApiKey(
      getApiKeyFromRequest(this._request) ?? '',
    );
    if (!userId) {
      throw new BadRequestException('Invalid User ID');
    }
    return userId;
  }
}
