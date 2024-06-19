import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import configuration from '../config/configuration';
import { ApiKeySchema } from './schemas/api-key.schema';
import { ApiKeyRepository } from 'src/authentication/repositories/api-key.repository';
import { CloudProviderModule } from 'src/cloud-provider/cloud-provider.module';

@Module({
  imports: [
    MongooseModule.forRoot(configuration().database.uri || ''),
    MongooseModule.forFeature([
      { name: 'ApiKey', schema: ApiKeySchema },
      { name: 'User', schema: UserSchema },
    ]),
    CloudProviderModule,
  ],
  providers: [ApiKeyRepository],
  exports: [ApiKeyRepository, MongooseModule],
})
export class DatabaseModule {}
