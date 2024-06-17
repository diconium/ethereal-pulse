import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import configuration from '../config/configuration';
import { ApiKeySchema } from './schemas/api-key.schema';
import { ApiKeyRepository } from 'src/authentication/repositories/api-key.repository';

@Module({
  imports: [
    MongooseModule.forRoot(configuration().database.uri || ''),
    MongooseModule.forFeature([
      { name: 'ApiKey', schema: ApiKeySchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  providers: [ApiKeyRepository],
  exports: [ApiKeyRepository, MongooseModule],
})
export class DatabaseModule {}
