import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CloudProvider,
  CloudProviderDocument,
} from 'src/database/schemas/cloud-provider.schema';

@Injectable()
export class CloudProviderRepository {
  constructor(
    @InjectModel(CloudProvider.name)
    private cloudProviderModel: Model<CloudProviderDocument>,
  ) {}

  /**
   * Creates a new CloudProvider.
   * @param {any} createCloudProviderDto - Data transfer object containing the details of the CloudProvider to create.
   * @returns {Promise<CloudProvider>} The created CloudProvider.
   */
  async create(createCloudProviderDto: any): Promise<CloudProvider> {
    const createdCloudProvider = new this.cloudProviderModel(
      createCloudProviderDto,
    );
    return createdCloudProvider.save();
  }

  /**
   * Retrieves all CloudProviders.
   * @returns {Promise<CloudProvider[]>} An array of all CloudProviders.
   */
  async findAll(): Promise<CloudProvider[]> {
    return this.cloudProviderModel.find().exec();
  }

  /**
   * Retrieves a single CloudProvider by its ID.
   * @param {string} id - The ID of the CloudProvider to retrieve.
   * @returns {Promise<CloudProvider | null>} The CloudProvider with the specified ID, or null if not found.
   */
  async findOne(id: string): Promise<CloudProvider | null> {
    return this.cloudProviderModel.findById(id).exec();
  }

  /**
   * Updates a CloudProvider by its ID.
   * @param {string} id - The ID of the CloudProvider to update.
   * @param {any} updateCloudProviderDto - Data transfer object containing the updated details of the CloudProvider.
   * @returns {Promise<CloudProvider | null>} The updated CloudProvider, or null if not found.
   */
  async update(
    id: string,
    updateCloudProviderDto: any,
  ): Promise<CloudProvider | null> {
    return this.cloudProviderModel
      .findByIdAndUpdate(id, updateCloudProviderDto, { new: true })
      .exec();
  }

  /**
   * Deletes a CloudProvider by its ID.
   * @param {string} id - The ID of the CloudProvider to delete.
   * @returns {Promise<CloudProvider | null>} The deleted CloudProvider, or null if not found.
   */
  async delete(id: string): Promise<CloudProvider | null> {
    return this.cloudProviderModel.findByIdAndDelete(id).exec();
  }
}
