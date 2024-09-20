import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { ApiKeyStrategy } from './account-policy/api-key-strategy';
import { ApiKeyRepository } from './repositories/api-key.repository';
import { ApiKey, ApiKeySchema } from '../database/schemas/api-key.schema';
import { AuthenticationService } from './services/authentication.service';

@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([{ name: ApiKey.name, schema: ApiKeySchema }]),
  ],
  providers: [
    AuthenticationService,
    ApiKeyStrategy,
    ApiKeyRepository,
    ApiKeyGuard,
  ],
  exports: [AuthenticationService, ApiKeyRepository, ApiKeyGuard],
})
export class AuthenticationModule {}
