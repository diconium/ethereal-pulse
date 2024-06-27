import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { ApiKeyService } from '../services/api-key.service';
import { GetApiKeyRequestDto, PostApiKeyRequestDto } from '../dto/api-key.dto';

@Controller('apiKeys')
@UseGuards(ApiKeyGuard)
export class ApiKeyController {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  @Get()
  async findAll(): Promise<GetApiKeyRequestDto[]> {
    return this.apiKeyService.findAll();
  }

  @Post()
  async createApiKey(@Body() payload: PostApiKeyRequestDto): Promise<void> {
    return this.apiKeyService.createApiKey(payload);
  }
}
