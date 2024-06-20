import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudProviderSchema } from 'src/database/schemas/cloud-provider.schema';
import { CloudProviderRepository } from './repositories/cloud-provider.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'CloudProvider', schema: CloudProviderSchema },
    ]),
  ],
  providers: [CloudProviderRepository],
  exports: [CloudProviderRepository],
})
export class CloudProviderModule {}
