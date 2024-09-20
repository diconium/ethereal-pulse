import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailService } from './services/email.service';
import { UserSchema } from 'src/database/schemas/user.schema';
import { DatabaseModule } from 'src/database/database.module';
import { EmailProviderFactory } from './factories/email-service.factory';
import { EmailController } from './controllers/email-service.controller';
import { ApiKeyRepository } from 'src/authentication/repositories/api-key.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    DatabaseModule,
  ],
  providers: [EmailService, EmailProviderFactory, ApiKeyRepository],
  controllers: [EmailController],
  exports: [EmailService],
})
export class EmailServiceModule {}
