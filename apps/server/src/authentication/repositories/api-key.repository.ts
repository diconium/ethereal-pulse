import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiKey } from 'src/database/schemas/api-key.schema';
import { ApiKeyDocument } from 'src/entities/api-key.entity';
import { ICloudProvider } from 'src/email-service/interfaces/cloud-provider.interface';
import { CloudProviderRepository } from 'src/cloud-provider/repositories/cloud-provider.repository';
import { CreateApiKeyDto } from 'src/api-key/dto/api-key.dto';
import * as bcrypt from 'bcrypt';

export interface IApiKeyDocumentWithProvider extends ApiKeyDocument {
  provider?: ICloudProvider;
}

@Injectable()
export class ApiKeyRepository {
  constructor(
    @InjectModel(ApiKey.name)
    private readonly apiKeyModel: Model<ApiKeyDocument>,
    private readonly cloudProviderRepository: CloudProviderRepository,
  ) {}

  /**
   * Creates a new API Key.
   * @param {CreateApiKeyDto} createApiKeyDto - Data transfer object containing the details of the Api Key to create.
   * @returns {Promise<ApiKey>} The created ApiKey.
   */
  async create(createApiKeyDto: CreateApiKeyDto): Promise<ApiKey> {
    return this.apiKeyModel.create(createApiKeyDto);
  }

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
    const apiKeys = await this.apiKeyModel.find().exec();

    for (const key of apiKeys) {
      if (await bcrypt.compare(apiKey, key.token)) {
        return key;
      }
    }
    return null;
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
    const apiKeyDoc = (await this.apiKeyModel
      .findOne({ token: apiKey })
      .exec()) as IApiKeyDocumentWithProvider;

    if (!apiKeyDoc ?? !apiKeyDoc.providerId) return null;

    const provider = await this.cloudProviderRepository.findOne(
      apiKeyDoc.providerId?.toString(),
    );

    if (!provider) return null;

    return { apiKeyDoc, provider };
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

  async findAll(): Promise<ApiKey[]> {
    return this.apiKeyModel.find().exec();
  }

  async findByIdAndDelete(id: string): Promise<void> {
    const result = await this.apiKeyModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`API Key #${id} not found`);
    }
  }
}
