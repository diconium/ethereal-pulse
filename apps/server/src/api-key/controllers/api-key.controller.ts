import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { ApiKeyService } from '../services/api-key.service';
import {
  GetApiKeysWrapperResponseDto,
  IdParamDto,
  PostApiKeyRequestDto,
  PostApiKeyResponseDto,
} from '../dto/api-key.dto';

@Controller('apiKeys')
@UseGuards(ApiKeyGuard)
export class ApiKeyController {
  constructor(private readonly _apiKeyService: ApiKeyService) {}

  @Get()
  async findAll(): Promise<GetApiKeysWrapperResponseDto> {
    return this._apiKeyService.findAll();
  }

  @Post()
  async createApiKey(
    @Body() payload: PostApiKeyRequestDto,
  ): Promise<PostApiKeyResponseDto> {
    return this._apiKeyService.createApiKey(payload);
  }

  @Delete(':id')
  async remove(@Param() params: IdParamDto): Promise<void> {
    return this._apiKeyService.remove(params.id);
  }
}
