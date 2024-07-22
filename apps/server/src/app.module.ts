import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from './config/configuration';
import { ApiKeyModule } from './api-key/api-key.module';
import { AppConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TemplateModule } from './templates/template.module';
import { EmailServiceModule } from './email-service/email-service.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { DomainModule } from './domain/domain.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('database.uri');
        if (!uri) {
          throw new Error('Database URI is not defined');
        }
        return {
          uri,
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    DatabaseModule,
    TemplateModule,
    AppConfigModule,
    EmailServiceModule,
    AuthenticationModule,
    ApiKeyModule,
    DomainModule,
  ],
})
export class AppModule {}
