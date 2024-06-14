import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailService } from './services/email.service';
import { UserSchema } from 'src/database/schemas/user.schema';
import { UserRepository } from '../repositories/user.repository';
import { EmailController } from './controllers/email-service.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [EmailService, UserRepository],
  controllers: [EmailController],
  exports: [EmailService],
})
export class EmailServiceModule {}
