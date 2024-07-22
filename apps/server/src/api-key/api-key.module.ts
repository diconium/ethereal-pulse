import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiKeyService } from './services/api-key.service';
import { DatabaseModule } from 'src/database/database.module';
import { ApiKeyController } from './controllers/api-key.controller';
import { ApiKey, ApiKeySchema } from 'src/database/schemas/api-key.schema';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { ApiKeyRepository } from 'src/authentication/repositories/api-key.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ApiKey.name, schema: ApiKeySchema }]),
    AuthenticationModule,
    DatabaseModule,
  ],
  providers: [ApiKeyService, ApiKeyRepository],
  controllers: [ApiKeyController],
  exports: [ApiKeyService],
})
export class ApiKeyModule {}
