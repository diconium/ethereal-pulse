import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { TemplateService } from './services/template.service';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { TemplateController } from './controller/template.controller';
import { TemplateRepository } from './repositories/template.repository';
import { Template, TemplateSchema } from 'src/database/schemas/template.schema';
import { AuthenticationModule } from 'src/authentication/authentication.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Template.name, schema: TemplateSchema },
    ]),
    AuthenticationModule,
    UserModule,
  ],
  controllers: [TemplateController],
  providers: [TemplateService, TemplateRepository, ApiKeyGuard],
})
export class TemplateModule {}
