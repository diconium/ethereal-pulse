import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TemplateDto } from '../dto/template.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Template } from 'src/database/schemas/template.schema';

@Injectable()
export class TemplateRepository {
  constructor(
    @InjectModel(Template.name) private templateModel: Model<Template>,
  ) {}

  async findAll(): Promise<Template[]> {
    return this.templateModel.find().exec();
  }

  async create(createTemplateDto: TemplateDto): Promise<Template> {
    return this.templateModel.create(createTemplateDto);
  }

  async findByIdAndUpdate(
    id: string,
    updateTemplateDto: TemplateDto,
  ): Promise<Template> {
    const existingTemplate = await this.templateModel
      .findByIdAndUpdate(id, updateTemplateDto, { new: true })
      .exec();
    if (!existingTemplate) {
      throw new NotFoundException(`Template #${id} not found`);
    }
    return existingTemplate;
  }

  async findByIdAndDelete(id: string): Promise<void> {
    const result = await this.templateModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Template #${id} not found`);
    }
  }
}
