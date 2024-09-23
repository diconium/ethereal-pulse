import {
  Get,
  Put,
  Body,
  Post,
  Param,
  Delete,
  UsePipes,
  UseGuards,
  Controller,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { getApiKeyFromRequest } from 'src/common/utils';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { IdParamDto, TemplateDto } from '../dto/template.dto';
import { TemplateService } from '../services/template.service';
import { Template } from 'src/database/schemas/template.schema';

@Controller('templates')
@UseGuards(ApiKeyGuard)
export class TemplateController {
  constructor(private readonly _templateService: TemplateService) {}

  @Get()
  async findAll(@Req() request: Request): Promise<Template[]> {
    // Update the type of request
    // Added @Req() to get the request object
    const apiKey = getApiKeyFromRequest(request);
    return this._templateService.findAll(apiKey);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createTemplateDto: TemplateDto) {
    return this._templateService.create(createTemplateDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('id') id: string,
    @Body() updateTemplateDto: TemplateDto,
  ): Promise<Template> {
    return this._templateService.update(id, updateTemplateDto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async remove(@Param() params: IdParamDto): Promise<void> {
    return this._templateService.remove(params.id);
  }
}
