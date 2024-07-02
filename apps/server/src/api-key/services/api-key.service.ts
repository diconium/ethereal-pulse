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
    @Inject(REQUEST) private readonly request: Request,
    private readonly apiKeyRepository: ApiKeyRepository,
  ) {}

  async findAll(): Promise<GetApiKeysWrapperResponseDto> {
    const userId = await this.apiKeyRepository.findUserIdByApiKey(
      getApiKeyFromRequest(this.request) ?? '',
    );

    return {
      data: (await this.apiKeyRepository.findAllByUserId(userId ?? '')).map(
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
      userId: 'test',
    };

    const apiKeyDocument = await this.apiKeyRepository.create(dto);

    return { id: apiKeyDocument._id?.toString(), token: token };
  }

  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid API key ID');
    }
    return this.apiKeyRepository.findByIdAndDelete(id);
  }
}
