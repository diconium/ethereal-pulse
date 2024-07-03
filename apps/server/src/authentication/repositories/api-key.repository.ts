import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiKey } from 'src/database/schemas/api-key.schema';
import { ApiKeyDocument } from 'src/entities/api-key.entity';
import { ICloudProvider } from 'src/email-service/interfaces/cloud-provider.interface';
import { CloudProviderRepository } from 'src/cloud-provider/repositories/cloud-provider.repository';

export interface IApiKeyDocumentWithProvider extends ApiKeyDocument {
  provider?: ICloudProvider;
}

@Injectable()
export class ApiKeyRepository {
  constructor(
    @InjectModel(ApiKey.name)
    private readonly _apiKeyModel: Model<ApiKeyDocument>,
    private readonly _cloudProviderRepository: CloudProviderRepository,
  ) {}

  /**
   * Finds an API key document by its ID.
   * @param {string} apiKeyId - The ID of the API key to search for.
   * @returns {Promise<ApiKeyDocument | null>} - A promise that resolves to the API key document if found, otherwise null.
   */
  async findOneById(apiKeyId: string): Promise<ApiKeyDocument | null> {
    return this._apiKeyModel.findOne({ _id: apiKeyId }).exec();
  }

  /**
   * Finds an API key document by its token.
   * @param {string} apiKey - The token of the API key to search for.
   * @returns {Promise<ApiKeyDocument | null>} - A promise that resolves to the API key document if found, otherwise null.
   */
  async findOne(apiKey: string): Promise<ApiKeyDocument | null> {
    return this._apiKeyModel.findOne({ token: apiKey }).exec();
  }

  /**
   * Retrieves an API key document based on the provided API key token and enriches it with the associated cloud provider details.
   * @param {string} apiKey - The token of the API key to search for.
   * @returns {Promise<{ apiKeyDoc: IApiKeyDocumentWithProvider, provider: ICloudProvider } | null>} - The API key document and its associated cloud provider if both are found, otherwise null.
   */
  async findOneWithProvider(apiKey: string): Promise<{
    apiKeyDoc: IApiKeyDocumentWithProvider;
    provider: ICloudProvider;
  } | null> {
    const apiKeyDoc = (await this._apiKeyModel
      .findOne({ token: apiKey })
      .exec()) as IApiKeyDocumentWithProvider;

    if (!apiKeyDoc ?? !apiKeyDoc.providerId) {
      return null;
    }

    const provider = await this._cloudProviderRepository.findOne(
      apiKeyDoc.providerId?.toString(),
    );

    if (!provider) {
      return null;
    }

    return { apiKeyDoc, provider };
  }

  /**
   * Find the user ID associated with a given API key.
   * @param {string} apiKey - The API key to search for.
   * @returns {Promise<string | null>} - The user ID associated with the API key or null if not found.
   */
  async findUserIdByApiKey(apiKey: string): Promise<string | null> {
    const apiKeyDocument = await this._apiKeyModel
      .findOne({ key: apiKey })
      .exec();
    return apiKeyDocument ? apiKeyDocument.userId : null;
  }
}
