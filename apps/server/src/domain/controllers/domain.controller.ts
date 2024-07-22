import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Delete,
  Param,
  ValidationPipe,
  UsePipes,
  Put,
} from '@nestjs/common';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { DomainService } from '../services/domain.service';
import {
  IdParamDto,
  PostDomainRequestDto,
  PutDomainRequestDto,
} from '../dto/domain.dto';
import { Domain, DomainDocument } from 'src/database/schemas/domain.schema';

@Controller('domains')
@UseGuards(ApiKeyGuard)
export class DomainController {
  constructor(private readonly domainService: DomainService) {}

  @Get()
  async findAll(): Promise<Domain[]> {
    return this.domainService.findAll();
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() payload: PostDomainRequestDto): Promise<DomainDocument> {
    return this.domainService.create(payload);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param() params: IdParamDto,
    @Body() dto: PutDomainRequestDto,
  ): Promise<DomainDocument> {
    return this.domainService.update(params.id, dto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async remove(@Param() params: IdParamDto): Promise<void> {
    return this.domainService.remove(params.id);
  }
}
