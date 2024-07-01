import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiKey } from 'src/database/schemas/api-key.schema';
import { ApiKeyDocument } from 'src/entities/api-key.entity';
import { ICloudProvider } from 'src/email-service/interfaces/cloud-provider.interface';


export interface IApiKeyDocumentWithProvider extends ApiKeyDocument {
  provider?: ICloudProvider;
}

@Injectable()
export class ApiKeyRepository {
  constructor(
    @InjectModel(ApiKey.name)
    private readonly apiKeyModel: Model<ApiKeyDocument>,
  ) {}

  /**
   * Finds an API key document by its ID.
   * @param {string} apiKeyId - The ID of the API key to search for.
   * @returns {Promise<ApiKeyDocument | null>} - A promise that resolves to the API key document if found, otherwise null.
   */
  async findOneById(apiKeyId: string): Promise<ApiKeyDocument | null> {
    return this.apiKeyModel.findOne({ _id: apiKeyId }).exec();
  }

  /**
   * Finds an API key document by its token.
   * @param {string} apiKey - The token of the API key to search for.
   * @returns {Promise<ApiKeyDocument | null>} - A promise that resolves to the API key document if found, otherwise null.
   */
  async findOne(apiKey: string): Promise<ApiKeyDocument | null> {
    return this.apiKeyModel.findOne({ token: apiKey }).exec();
  }

  /**
   * Find the user ID associated with a given API key.
   * @param {string} apiKey - The API key to search for.
   * @returns {Promise<string | null>} - The user ID associated with the API key or null if not found.
   */
  async findUserIdByApiKey(apiKey: string): Promise<string | null> {
    const apiKeyDocument = await this.apiKeyModel
      .findOne({ key: apiKey })
      .exec();
    return apiKeyDocument ? apiKeyDocument.userId : null;
  }
}
