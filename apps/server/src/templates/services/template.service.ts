import { TemplateDto } from '../dto/template.dto';
import { Template } from 'src/database/schemas/template.schema';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/repositories/user.repository';
import { TemplateRepository } from '../repositories/template.repository';

@Injectable()
export class TemplateService {
  constructor(
    private readonly templateRepository: TemplateRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async findAll(): Promise<Template[]> {
    return this.templateRepository.findAll();
  }

  async create(createTemplateDto: TemplateDto): Promise<Template> {
    if (createTemplateDto.userId) {
      await this.validateUserId(createTemplateDto.userId);
    }
    return this.templateRepository.create(createTemplateDto);
  }

  async update(id: string, updateTemplateDto: TemplateDto): Promise<Template> {
    if (updateTemplateDto.userId) {
      await this.validateUserId(updateTemplateDto.userId);
    }
    return this.templateRepository.findByIdAndUpdate(id, updateTemplateDto);
  }

  async remove(id: string): Promise<void> {
    if (!id) {
      throw new BadRequestException('Template ID must be provided');
    }
    return this.templateRepository.findByIdAndDelete(id);
  }

  private async validateUserId(userId: string): Promise<boolean> {
    const userExists = await this.userRepository.exists(userId);
    if (!userExists) {
      throw new BadRequestException('Invalid userId');
    }
    return userExists;
  }
}
