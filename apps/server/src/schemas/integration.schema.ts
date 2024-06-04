import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type IntegrationDocument = HydratedDocument<Integration>;

@Schema()
export class Integration {
  @Prop()
  smtpPort: string;

  @Prop()
  host: string;

  @Prop()
  config_key: string;
}

export const IntegrationSchema = SchemaFactory.createForClass(Integration);