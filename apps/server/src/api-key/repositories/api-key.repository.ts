import { Model, Error as MongooseError } from 'mongoose';

import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { ApiKey } from 'src/database/schemas/api-key.schema';
import { ApiKeyDocument } from 'src/entities/api-key.entity';
import { CreateApiKeyDto } from 'src/api-key/dto/api-key.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ICloudProvider } from 'src/email-service/interfaces/cloud-provider.interface';

export interface IApiKeyDocumentWithProvider extends ApiKeyDocument {
  provider?: ICloudProvider;
}

interface MongoError extends Error {
  code: number;
}

@Injectable()
export class ApiKeyRepository {
  constructor(
    @InjectModel(ApiKey.name)
    private readonly _apiKeyModel: Model<ApiKeyDocument>,
  ) {}

  /**
   * Creates a new API Key.
   * @param {CreateApiKeyDto} createApiKeyDto - Data transfer object containing the details of the Api Key to create.
   * @returns {Promise<ApiKey>} The created ApiKey.
   */
  async create(createApiKeyDto: CreateApiKeyDto): Promise<ApiKeyDocument> {
    try {
      return await this._apiKeyModel.create(createApiKeyDto);
    } catch (error) {
      console.log(JSON.stringify(error));
      if (
        error instanceof MongooseError &&
        (error as MongoError).name === 'MongoError' &&
        (error as MongoError).code === 11000
      ) {
        throw new BadRequestException(
          'API Key with the same name and userId already exists',
        );
      }
      throw error;
    }
  }

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
    const apiKeys = await this._apiKeyModel.find().exec();

    for (const key of apiKeys) {
      if (await bcrypt.compare(apiKey, key.token)) {
        return key;
      }
    }
    return null;
  }

  /**
   * Find the user ID associated with a given API key.
   * @param {string} apiKey - The API key to search for.
   * @returns {Promise<string | null>} - The user ID associated with the API key or null if not found.
   */
  async findUserIdByApiKey(apiKey: string): Promise<string | null> {
    const apiKeyDocument = await this.findOne(apiKey);
    return apiKeyDocument ? apiKeyDocument.userId : null;
  }

  async findAll(): Promise<ApiKey[]> {
    return this._apiKeyModel.find().exec();
  }

  async findAllByUserId(userId: string): Promise<ApiKeyDocument[]> {
    return this._apiKeyModel.find({ userId }).exec();
  }

  async findByIdAndUserAndDelete(id: string, userId: string): Promise<void> {
    const result = await this._apiKeyModel
      .findOneAndDelete({ _id: id, userId: userId })
      .exec();
    if (!result) {
      throw new NotFoundException(`API Key #${id} not found`);
    }
  }
}
