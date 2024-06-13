import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiKeySchema } from './schemas/api-key.schema';
import { UserSchema } from './schemas/user.schema';
import configuration from '../config/configuration';

@Module({
  imports: [
    MongooseModule.forRoot(configuration().database.uri),
    MongooseModule.forFeature([{ name: 'ApiKey', schema: ApiKeySchema }]);
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]);
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
