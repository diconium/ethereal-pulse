import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from './config/configuration';
import { AppConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { EmailServiceModule } from './email-service/email-service.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { CloudProviderModule } from './cloud-provider/cloud-provider.module';
import { ApiKeyModule } from './api-key/api-key.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRoot(configuration().database.uri || ''),
    UserModule,
    DatabaseModule,
    AppConfigModule,
    EmailServiceModule,
    CloudProviderModule,
    AuthenticationModule,
    ApiKeyModule,
  ],
})
export class AppModule {}
