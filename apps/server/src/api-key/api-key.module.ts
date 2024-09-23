import { Module } from '@nestjs/common';
import { ApiKeyService } from './services/api-key.service';
import { DatabaseModule } from 'src/database/database.module';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { ApiKeyController } from './controllers/api-key.controller';
import { ApiKeyRepository } from './repositories/api-key.repository';

@Module({
  imports: [DatabaseModule],
  providers: [ApiKeyService, ApiKeyRepository, ApiKeyGuard],
  controllers: [ApiKeyController],
  exports: [ApiKeyService, ApiKeyRepository],
})
export class ApiKeyModule {}
