import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepositoryModule } from './repositories/user.repository.module';
import { UserSchema } from 'src/database/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    UserRepositoryModule,
  ],
  exports: [UserRepositoryModule],
})
export class UserModule {}
