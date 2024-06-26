import { Injectable } from '@nestjs/common';
import { CreateApiKeyDto, PostApiKeyRequestDto } from '../dto/api-key.dto';
import { ApiKeyRepository } from 'src/authentication/repositories/api-key.repository';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

@Injectable()
export class ApiKeyService {
  constructor(private readonly apiKeyRepository: ApiKeyRepository) {}

  async createApiKey(payload: PostApiKeyRequestDto): Promise<any> {
    const apiKey = randomUUID();

    const dto: CreateApiKeyDto = {
      ...payload,
      token: await bcrypt.hash(apiKey, 10),
      userId: 'test',
    };

    await this.apiKeyRepository.create(dto);
  }
}
