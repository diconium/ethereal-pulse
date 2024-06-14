import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { ApiKeySchema } from '../database/schemas/api-key.schema';
import { ApiKeyStrategy } from './account-policy/api-key-strategy';
import { ApiKeyRepository } from './repositories/api-key.repository';
import { AuthenticationService } from './services/authentication.service';

@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([{ name: 'ApiKey', schema: ApiKeySchema }]),
  ],
  providers: [AuthenticationService, ApiKeyStrategy, ApiKeyRepository],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
