import { Types } from 'mongoose';
import { TemplateDto } from '../dto/template.dto';
import { Template } from 'src/database/schemas/template.schema';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/repositories/user.repository';
import { TemplateRepository } from '../repositories/template.repository';

@Injectable()
export class TemplateService {
  constructor(
    private readonly _templateRepository: TemplateRepository,
    private readonly _userRepository: UserRepository,
  ) {}

  async findAll(): Promise<Template[]> {
    return this._templateRepository.findAll();
  }

  async create(createTemplateDto: TemplateDto): Promise<Template> {
    if (createTemplateDto.userId) {
      await this.validateUserId(createTemplateDto.userId);
    }
    return this._templateRepository.create(createTemplateDto);
  }

  async update(id: string, updateTemplateDto: TemplateDto): Promise<Template> {
    if (updateTemplateDto.userId) {
      await this.validateUserId(updateTemplateDto.userId);
    }
    return this._templateRepository.findByIdAndUpdate(id, updateTemplateDto);
  }

  async remove(id: string): Promise<void> {
    if (!id) {
      throw new BadRequestException('Template ID must be provided');
    }
    return this._templateRepository.findByIdAndDelete(id);
  }

  private async validateUserId(userId: string): Promise<boolean> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid userId format');
    }
    const userExists = await this._userRepository.exists(userId);
    if (!userExists) {
      throw new BadRequestException('Invalid userId');
    }
    return userExists;
  }
}
