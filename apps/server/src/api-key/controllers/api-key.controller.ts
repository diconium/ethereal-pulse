import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { ApiKeyService } from '../services/api-key.service';
import { PostApiKeyRequestDto } from '../dto/api-key.dto';

@Controller('apiKeys')
@UseGuards(ApiKeyGuard)
export class ApiKeyController {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  @Post()
  async createApiKey(@Body() payload: PostApiKeyRequestDto): Promise<void> {
    return this.apiKeyService.createApiKey(payload);
  }
}
