import { BadRequestException, Inject, Injectable, Scope } from '@nestjs/common';
import { Types } from 'mongoose';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { DomainRepository } from '../repositories/domain.repository';
import { Domain, DomainDocument } from 'src/database/schemas/domain.schema';
import { ApiKeyRepository } from 'src/authentication/repositories/api-key.repository';
import { getApiKeyIdFromRequest } from 'src/common/utils/utils';
import {
  CreateDomainDto,
  PostDomainRequestDto,
  PutDomainRequestDto,
} from '../dto/domain.dto';

@Injectable({ scope: Scope.REQUEST })
export class DomainService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly domainRepository: DomainRepository,
    private readonly apiKeyRepository: ApiKeyRepository,
  ) {}

  async findAll(): Promise<Domain[]> {
    const apiKeyId = await getApiKeyIdFromRequest(
      this.request,
      this.apiKeyRepository,
    );

    if (!apiKeyId) {
      throw new BadRequestException('Invalid API Key ID');
    }

    return await this.domainRepository.findByApiKey(apiKeyId);
  }

  async create(payload: PostDomainRequestDto): Promise<DomainDocument> {
    const apiKeyId = await getApiKeyIdFromRequest(
      this.request,
      this.apiKeyRepository,
    );

    if (!apiKeyId) {
      throw new BadRequestException('Invalid API Key ID');
    }

    const domainDto: CreateDomainDto = { ...payload, apiKey: apiKeyId };

    return await this.domainRepository.create(domainDto);
  }

  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid Domain ID');
    }

    const apiKeyId = await getApiKeyIdFromRequest(
      this.request,
      this.apiKeyRepository,
    );

    if (!apiKeyId) {
      throw new BadRequestException('Invalid API Key ID');
    }

    await this.domainRepository.findByIdAndApiKeyAndDelete(id, apiKeyId);
  }

  async update(
    id: string,
    updateTemplateDto: PutDomainRequestDto,
  ): Promise<DomainDocument> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid Domain ID');
    }

    const apiKeyId = await getApiKeyIdFromRequest(
      this.request,
      this.apiKeyRepository,
    );

    if (!apiKeyId) {
      throw new BadRequestException('Invalid API Key ID');
    }

    return this.domainRepository.findByIdAndApiKeyAndUpdate(
      id,
      apiKeyId,
      updateTemplateDto,
    );
  }
}
