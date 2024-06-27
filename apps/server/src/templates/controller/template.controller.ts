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
} from '@nestjs/common';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { IdParamDto, TemplateDto } from '../dto/template.dto';
import { TemplateService } from '../services/template.service';
import { Template } from 'src/database/schemas/template.schema';

@Controller('templates')
@UseGuards(ApiKeyGuard)
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Get()
  async findAll(): Promise<Template[]> {
    return this.templateService.findAll();
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createTemplateDto: TemplateDto) {
    return this.templateService.create(createTemplateDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('id') id: string,
    @Body() updateTemplateDto: TemplateDto,
  ): Promise<Template> {
    return this.templateService.update(id, updateTemplateDto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async remove(@Param() params: IdParamDto): Promise<void> {
    return this.templateService.remove(params.id);
  }
}
