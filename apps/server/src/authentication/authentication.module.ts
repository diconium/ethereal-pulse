import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { ApiKeySchema } from '../database/schemas/api-key.schema';
import { ApiKeyStrategy } from './account-policy/api-key-strategy';
import { ApiKeyRepository } from './repositories/api-key.repository';
import { AuthenticationService } from './services/authentication.service';

@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([{ name: 'ApiKey', schema: ApiKeySchema }]),
    UserModule,
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
