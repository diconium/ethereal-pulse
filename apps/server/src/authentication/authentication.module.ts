import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ApiKeyModule } from 'src/api-key/api-key.module';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { DatabaseModule } from 'src/database/database.module';
import { ApiKeyStrategy } from './account-policy/api-key-strategy';
import { ApiKeyService } from 'src/api-key/services/api-key.service';
import { AuthenticationService } from './services/authentication.service';

@Module({
  imports: [PassportModule, ApiKeyModule, DatabaseModule],
  providers: [
    AuthenticationService,
    ApiKeyService,
    ApiKeyStrategy,
    ApiKeyGuard,
  ],
  exports: [AuthenticationService, ApiKeyGuard],
})
export class AuthenticationModule {}
