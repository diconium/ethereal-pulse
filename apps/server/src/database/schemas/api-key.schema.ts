import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { API_KEY_PERMISSION_KEYS } from 'src/authentication/constants/api-key-permissions.constant';
import { IApiKey } from 'src/authentication/interfaces/api-key.interface';
import { ApiKeyPermission } from 'src/common/enums/api-key-permission.enum';
import { MODEL_NAMES } from '../constants/common.constant';

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

  @Prop({ required: true })
  token: string;

  @Prop({
    type: Types.ObjectId,
    ref: MODEL_NAMES.USER,
    required: true,
  })
  userId: string;
}

export const ApiKeySchema = SchemaFactory.createForClass(ApiKey);
ApiKeySchema.index({ name: 1, userId: 1 }, { unique: true });
