import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import configuration from '../config/configuration';
import { ApiKeySchema } from './schemas/api-key.schema';

@Module({
  imports: [
    MongooseModule.forRoot(configuration().database.uri),
    MongooseModule.forFeature([{ name: 'ApiKey', schema: ApiKeySchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
