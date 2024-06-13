import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { ApiKeyStrategy } from './account-policy/api-key-strategy';
import { AuthenticationService } from './services/authentication.service';
import { ApiKeySchema } from '../database/schemas/api-key.schema';

@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([{ name: 'ApiKey', schema: ApiKeySchema }]),
  ],
  providers: [AuthenticationService, ApiKeyStrategy],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
