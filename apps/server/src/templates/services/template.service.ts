import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { TemplateDto } from '../dto/template.dto';
import { getApiKeyFromRequest } from 'src/common/utils';
import { Template } from 'src/database/schemas/template.schema';
import { ApiKeyService } from 'src/api-key/services/api-key.service';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { TemplateRepository } from '../repositories/template.repository';
import { ERROR_MESSAGES } from 'src/common/constants/error-messages-constants';

@Injectable()
export class TemplateService {
  constructor(
    @Inject(REQUEST) private readonly _request: Request,
    private readonly _templateRepository: TemplateRepository,
    private readonly _apiKeyService: ApiKeyService,
  ) {}

  async findAll(apiKey: string): Promise<Template[]> {
    const userId = await this._apiKeyService.getUserId(apiKey, this._request);

    const result = await this._templateRepository.find({
      $or: [{ userId: null }, { userId }],
    });
    console.log('result....');
    console.log(result);
    return result;
  }

  async create(createTemplateDto: TemplateDto): Promise<Template> {
    const apiKey = getApiKeyFromRequest(this._request);
    const userId = await this._apiKeyService.getUserId(apiKey, this._request);

    const templateWithUserId = { ...createTemplateDto, userId };
    console.log('in templateWithUserId....');
    console.log(templateWithUserId);
    return this._templateRepository.create(templateWithUserId);
  }

  async update(id: string, updateTemplateDto: TemplateDto): Promise<Template> {
    return this._templateRepository.findByIdAndUpdate(id, updateTemplateDto);
  }

  async remove(id: string): Promise<void> {
    if (!id) {
      throw new BadRequestException(ERROR_MESSAGES.TEMPLATE_ID_NOT_FOUND(id));
    }
    return this._templateRepository.findByIdAndDelete(id);
  }
}
