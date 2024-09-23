import { Module } from '@nestjs/common';
import { DomainService } from './services/domain.service';
import { ApiKeyModule } from 'src/api-key/api-key.module';
import { DatabaseModule } from 'src/database/database.module';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { DomainController } from './controllers/domain.controller';
import { DomainRepository } from './repositories/domain.repository';
import { ApiKeyRepository } from 'src/api-key/repositories/api-key.repository';

@Module({
  exports: [DomainService],
  controllers: [DomainController],
  imports: [DatabaseModule, ApiKeyModule],
  providers: [DomainService, DomainRepository, ApiKeyRepository, ApiKeyGuard],
})
export class DomainModule {}
