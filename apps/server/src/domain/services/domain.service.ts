import {
  CreateDomainDto,
  PostDomainRequestDto,
  PutDomainRequestDto,
} from '../dto/domain.dto';
import { Types } from 'mongoose';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { getApiKeyIdFromRequest } from 'src/common/utils';
import { DomainRepository } from '../repositories/domain.repository';
import { Domain, DomainDocument } from 'src/database/schemas/domain.schema';
import { ERROR_MESSAGES } from 'src/common/constants/error-messages-constants';
import { ApiKeyRepository } from 'src/api-key/repositories/api-key.repository';
import { BadRequestException, Inject, Injectable, Scope } from '@nestjs/common';

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
      throw new BadRequestException(ERROR_MESSAGES.INVALID_API_KEY_ID);
    }

    return await this.domainRepository.findByApiKey(apiKeyId);
  }

  async create(payload: PostDomainRequestDto): Promise<DomainDocument> {
    const apiKeyId = await getApiKeyIdFromRequest(
      this.request,
      this.apiKeyRepository,
    );

    if (!apiKeyId) {
      throw new BadRequestException(ERROR_MESSAGES.INVALID_API_KEY_ID);
    }

    const domainDto: CreateDomainDto = { ...payload, apiKey: apiKeyId };

    return await this.domainRepository.create(domainDto);
  }

  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(ERROR_MESSAGES.DOMAIN_ID_NOT_FOUND(id));
    }

    const apiKeyId = await getApiKeyIdFromRequest(
      this.request,
      this.apiKeyRepository,
    );

    if (!apiKeyId) {
      throw new BadRequestException(ERROR_MESSAGES.INVALID_API_KEY_ID);
    }

    await this.domainRepository.findByIdAndApiKeyAndDelete(id, apiKeyId);
  }

  async update(
    id: string,
    updateTemplateDto: PutDomainRequestDto,
  ): Promise<DomainDocument> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(ERROR_MESSAGES.DOMAIN_ID_NOT_FOUND(id));
    }

    const apiKeyId = await getApiKeyIdFromRequest(
      this.request,
      this.apiKeyRepository,
    );

    if (!apiKeyId) {
      throw new BadRequestException(ERROR_MESSAGES.INVALID_API_KEY_ID);
    }

    return this.domainRepository.findByIdAndApiKeyAndUpdate(
      id,
      apiKeyId,
      updateTemplateDto,
    );
  }
}
