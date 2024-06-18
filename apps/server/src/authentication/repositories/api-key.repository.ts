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

  /**
   * Find one API key document by its key
   * @param {string} apiKey - The API key to search for
   * @returns {Promise<ApiKeyDocument | null>} - The found API key document or null if not found
   */
  async findOne(apiKey: string): Promise<ApiKeyDocument | null> {
    return this.apiKeyModel.findOne({ key: apiKey }).exec();
  }

  /**
   * Find one API key document by its key and populate the provider field
   * @param {string} apiKey - The API key to search for
   * @returns {Promise<ApiKeyDocument | null>} - The found API key document with populated provider or null if not found
   */
  async findOneWithProvider(apiKey: string): Promise<ApiKeyDocument | null> {
    return this.apiKeyModel
      .findOne({ key: apiKey })
      .populate('provider')
      .exec();
  }

  /**
   * Find the user ID associated with a given API key
   * @param {string} apiKey - The API key to search for
   * @returns {Promise<string | null>} - The user ID associated with the API key or null if not found
   */
  async findUserIdByApiKey(apiKey: string): Promise<string | null> {
    const apiKeyDocument = await this.apiKeyModel
      .findOne({ key: apiKey })
      .exec();
    return apiKeyDocument ? apiKeyDocument.userId : null;
  }
}
