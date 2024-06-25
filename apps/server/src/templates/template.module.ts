import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TemplateService } from './services/template.service';
import { TemplateController } from './controller/template.controller';
import { TemplateRepository } from './repositories/template.repository';
import { Template, TemplateSchema } from 'src/database/schemas/template.schema';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Template.name, schema: TemplateSchema },
    ]),
    AuthenticationModule,
  ],
  controllers: [TemplateController],
  providers: [TemplateService, TemplateRepository, ApiKeyGuard],
})
export class TemplateModule {}
