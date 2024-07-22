import { Module } from '@nestjs/common';
import { DomainController } from './controllers/domain.controller';
import { DomainService } from './services/domain.service';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { DatabaseModule } from 'src/database/database.module';
import { DomainRepository } from './repositories/domain.repository';

@Module({
  imports: [AuthenticationModule, DatabaseModule],
  providers: [DomainService, DomainRepository],
  controllers: [DomainController],
})
export class DomainModule {}
