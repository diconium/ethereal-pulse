import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Recipient, RecipientSchema } from './recipient.schema';

export type ApiKeyDocument = HydratedDocument<ApiKey>;

@Schema()
export class ApiKey {
  @Prop()
  key: string;

  @Prop()
  name: string;
}

export const ApiKeySchema = SchemaFactory.createForClass(ApiKey);