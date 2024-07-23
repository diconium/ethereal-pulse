import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { ApiKeySchema } from './schemas/api-key.schema';
import { ApiKeyRepository } from 'src/authentication/repositories/api-key.repository';
import { DomainSchema } from './schemas/domain.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ApiKey', schema: ApiKeySchema },
      { name: 'User', schema: UserSchema },
      { name: 'Domain', schema: DomainSchema },
    ]),
  ],
  providers: [ApiKeyRepository],
  exports: [ApiKeyRepository, MongooseModule],
})
export class DatabaseModule {}
