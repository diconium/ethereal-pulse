import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IApiKey,
  ApiKeyPermission,
} from 'src/authentication/interfaces/api-key.interface';
import { API_KEY_PERMISSION_KEYS } from 'src/authentication/constants/api-key-permissions.constant';
import { Types, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class ApiKey implements IApiKey {
  @Prop({ required: true })
  name: string;

  @Prop({
    enum: Object.values(API_KEY_PERMISSION_KEYS),
    default: API_KEY_PERMISSION_KEYS.SENDING_ACCESS,
  })
  permission: ApiKeyPermission;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop()
  domainId?: string;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'CloudProvider' }],
  })
  providerId: Types.ObjectId;

  @Prop({ required: true })
  token: string;

  @Prop({ required: true })
  userId: string;
}

export const ApiKeySchema = SchemaFactory.createForClass(ApiKey);
