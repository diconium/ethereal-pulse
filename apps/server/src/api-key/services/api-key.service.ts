import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CreateApiKeyDto,
  GetApiKeyRequestDto,
  PostApiKeyRequestDto,
  PostApiKeyResponseDto,
} from '../dto/api-key.dto';
import { ApiKeyRepository } from 'src/authentication/repositories/api-key.repository';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { Types } from 'mongoose';

@Injectable()
export class ApiKeyService {
  constructor(private readonly apiKeyRepository: ApiKeyRepository) {}

  async findAll(): Promise<GetApiKeyRequestDto[]> {
    return (await this.apiKeyRepository.findAll()).map((apiKey) => {
      return {
        id: apiKey._id?.toString(),
        name: apiKey.name,
        created_at: apiKey.createdAt,
      };
    });
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
