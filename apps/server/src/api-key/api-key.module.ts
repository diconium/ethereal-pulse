import { Module } from '@nestjs/common';
import { ApiKeyController } from './controllers/api-key.controller';
import { ApiKeyService } from './services/api-key.service';
import { ApiKeyRepository } from 'src/authentication/repositories/api-key.repository';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [AuthenticationModule, DatabaseModule],
  providers: [ApiKeyService, ApiKeyRepository],
  controllers: [ApiKeyController],
  exports: [ApiKeyService],
})
export class ApiKeyModule {}
