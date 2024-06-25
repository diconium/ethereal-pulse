import { BadRequestException, Injectable } from '@nestjs/common';
import { TemplateRepository } from '../repositories/template.repository';
import { TemplateDto } from '../dto/template.dto';
import { Template } from 'src/database/schemas/template.schema';

@Injectable()
export class TemplateService {
  constructor(private readonly templateRepository: TemplateRepository) {}

  async findAll(): Promise<Template[]> {
    return this.templateRepository.findAll();
  }

  async create(createTemplateDto: TemplateDto): Promise<Template> {
    return this.templateRepository.create(createTemplateDto);
  }

  async update(id: string, updateTemplateDto: TemplateDto): Promise<Template> {
    return this.templateRepository.findByIdAndUpdate(id, updateTemplateDto);
  }

  async remove(id: string): Promise<void> {
    if (!id) {
      throw new BadRequestException('Template ID must be provided');
    }
    return this.templateRepository.findByIdAndDelete(id);
  }
}
