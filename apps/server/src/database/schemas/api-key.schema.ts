import { Types } from 'mongoose';
import { MODEL_NAMES } from '../constants/common.constant';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IApiKey } from 'src/authentication/interfaces/api-key.interface';
import { ApiKeyPermission } from 'src/common/enums/api-key-permission.enum';
import { API_KEY_PERMISSION_KEYS } from 'src/authentication/constants/api-key-permissions.constant';

@Schema({ timestamps: true })
export class ApiKey implements IApiKey {
  createdAt: Date;
  @Prop({ required: true })
  name: string;

  @Prop({
    enum: Object.values(API_KEY_PERMISSION_KEYS),
    default: API_KEY_PERMISSION_KEYS.SENDING_ACCESS,
  })
  permission: ApiKeyPermission;

  @Prop()
  domainId?: string;

  @Prop({ type: String, required: true })
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
ApiKeySchema.on('index', (error) => {
  if (error) {
    console.error('Index creation failed:', error);
  }
});
