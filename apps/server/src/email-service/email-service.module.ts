import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailService } from './services/email.service';
import { UserSchema } from 'src/database/schemas/user.schema';
import { UserRepository } from 'src/user/repositories/user.repository';
import { EmailServiceFactory } from './factories/email-service.factory';
import { EmailController } from './controllers/email-service.controller';
import { UserRepositoryModule } from 'src/user/repositories/user.repository.module';
import { ApiKeyRepository } from 'src/authentication/repositories/api-key.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    DatabaseModule,
    UserRepositoryModule,
  ],
  providers: [
    EmailService,
    EmailServiceFactory,
    UserRepository,
    ApiKeyRepository,
  ],
  controllers: [EmailController],
  exports: [EmailService],
})
export class EmailServiceModule {}
