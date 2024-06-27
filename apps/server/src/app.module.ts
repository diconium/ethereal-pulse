import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from './config/configuration';
import { AppConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { TemplateModule } from './templates/template.module';
import { EmailServiceModule } from './email-service/email-service.module';
import { CloudProviderModule } from './cloud-provider/cloud-provider.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRoot(configuration().database.uri || ''),
    UserModule,
    DatabaseModule,
    TemplateModule,
    AppConfigModule,
    EmailServiceModule,
    CloudProviderModule,
    AuthenticationModule,
  ],
})
export class AppModule {}
