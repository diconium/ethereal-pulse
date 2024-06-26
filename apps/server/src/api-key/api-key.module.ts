import { Module } from '@nestjs/common';
import { ApiKeyController } from './controllers/api-key.controller';
import { ApiKeyService } from './services/api-key.service';
import { ApiKeyRepository } from 'src/authentication/repositories/api-key.repository';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { DatabaseModule } from 'src/database/database.module';
import { CloudProviderRepository } from 'src/cloud-provider/repositories/cloud-provider.repository';
import { CloudProviderModule } from 'src/cloud-provider/cloud-provider.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudProviderSchema } from 'src/database/schemas/cloud-provider.schema';

@Module({
  imports: [
    AuthenticationModule,
    DatabaseModule,
    CloudProviderModule,
    MongooseModule.forFeature([
      { name: 'CloudProvider', schema: CloudProviderSchema },
    ]),
  ],
  providers: [ApiKeyService, ApiKeyRepository, CloudProviderRepository],
  controllers: [ApiKeyController],
  exports: [ApiKeyService],
})
export class ApiKeyModule {}
