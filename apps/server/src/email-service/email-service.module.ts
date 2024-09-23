import { Module } from '@nestjs/common';
import { EmailService } from './services/email.service';
import { DatabaseModule } from 'src/database/database.module';
import { EmailProviderFactory } from './factories/email-service.factory';
import { EmailController } from './controllers/email-service.controller';
import { ApiKeyRepository } from 'src/api-key/repositories/api-key.repository';
import { ApiKeyModule } from 'src/api-key/api-key.module';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';

@Module({
  imports: [DatabaseModule, ApiKeyModule],
  providers: [
    ApiKeyGuard,
    EmailService,
    ApiKeyRepository,
    EmailProviderFactory,
  ],
  controllers: [EmailController],
  exports: [EmailService],
})
export class EmailServiceModule {}
