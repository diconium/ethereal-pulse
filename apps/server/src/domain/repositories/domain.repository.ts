import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Domain, DomainDocument } from 'src/database/schemas/domain.schema';
import { CreateDomainDto } from '../dto/domain.dto';

@Injectable()
export class DomainRepository {
  constructor(@InjectModel(Domain.name) private domainModel: Model<Domain>) {}

  async findByApiKey(apiKeyId: Types.ObjectId): Promise<Domain[]> {
    return this.domainModel.find({ apiKey: apiKeyId }).exec();
  }

  async create(domain: CreateDomainDto): Promise<DomainDocument> {
    return this.domainModel.create(domain);
  }

  async findByIdAndApiKeyAndUpdate(
    id: string,
    apiKeyId: string,
    domain: Domain,
  ): Promise<DomainDocument> {
    const existingDomain = await this.domainModel
      .findOneAndUpdate({ _id: id, apiKey: apiKeyId }, domain, { new: true })
      .exec();
    if (!existingDomain) {
      throw new NotFoundException(`Domain #${id} not found`);
    }
    return existingDomain;
  }

  async findByIdAndApiKeyAndDelete(
    id: string,
    apiKeyId: Types.ObjectId,
  ): Promise<void> {
    const result = await this.domainModel
      .findOneAndDelete({ _id: id, apiKey: apiKeyId })
      .exec();
    if (!result) {
      throw new NotFoundException(`Domain #${id} not found`);
    }
  }
}
