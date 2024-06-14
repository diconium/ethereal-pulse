import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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

  @Prop({ required: true })
  token: string;
}

export const ApiKeySchema = SchemaFactory.createForClass(ApiKey);
