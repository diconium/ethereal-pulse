import { Module } from '@nestjs/common';
import { ApiKeyModule } from 'src/api-key/api-key.module';
import { TemplateService } from './services/template.service';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { DatabaseModule } from 'src/database/database.module';
import { ApiKeyService } from 'src/api-key/services/api-key.service';
import { TemplateController } from './controller/template.controller';
import { TemplateRepository } from './repositories/template.repository';
import { AuthenticationModule } from 'src/authentication/authentication.module';

@Module({
  imports: [DatabaseModule, ApiKeyModule, AuthenticationModule],
  controllers: [TemplateController],
  providers: [TemplateService, TemplateRepository, ApiKeyGuard, ApiKeyService],
})
export class TemplateModule {}
