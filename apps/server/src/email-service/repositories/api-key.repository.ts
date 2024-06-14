import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiKey, ApiKeyDocument } from 'src/database/schemas/api-key.schema';

@Injectable()
export class ApiKeyRepository {
  constructor(
    @InjectModel(ApiKey.name)
    private readonly apiKeyModel: Model<ApiKeyDocument>,
  ) {}

  async findOneWithProvider(apiKey: string): Promise<ApiKeyDocument | null> {
    return this.apiKeyModel
      .findOne({ key: apiKey })
      .populate('provider')
      .exec();
  }
}
