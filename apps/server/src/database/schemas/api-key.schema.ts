import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CloudProvider } from 'src/database/schemas/cloud-provider.schema';
import { ICloudProvider } from 'src/email-service/interfaces/cloud-provider.interface';
import { API_KEY_PERMISSION_KEYS } from 'src/authentication/constants/api-key-permissions.contant';

export type ApiKeyDocument = HydratedDocument<ApiKey>;

@Schema()
export class ApiKey {
  @Prop({ required: true })
  name: string;

  @Prop({
    enum: [
      API_KEY_PERMISSION_KEYS.FULL_ACCESS,
      API_KEY_PERMISSION_KEYS.SENDING_ACCESS,
    ],
    default: API_KEY_PERMISSION_KEYS.SENDING_ACCESS,
  })
  permission: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop()
  domainId?: string;

  @Prop({ required: true, type: CloudProvider })
  provider: ICloudProvider;

  @Prop({ required: true })
  token: string;
}

export const ApiKeySchema = SchemaFactory.createForClass(ApiKey);
