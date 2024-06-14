import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ICloudProvider } from 'src/entities/cloud-provider.entity';
import { CloudProvider } from 'src/database/schemas/cloud-provider.schema';

export type ApiKeyDocument = HydratedDocument<ApiKey>;

@Schema()
export class ApiKey {
  @Prop({ required: true })
  name: string;

  @Prop({ enum: ['full_access', 'sending_access'], default: 'sending_access' })
  permission: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop()
  domainId?: string;

  @Prop({ required: true, type: CloudProvider })
  provider: ICloudProvider;
}

export const ApiKeySchema = SchemaFactory.createForClass(ApiKey);
