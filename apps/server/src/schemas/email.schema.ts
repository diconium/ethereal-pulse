import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EmailDocument = HydratedDocument<Email>;

@Schema()
export class Email {
  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: [String], required: true })
  recipients: string[];

  @Prop([String])
  cc?: string[];

  @Prop([String])
  bcc?: string[];
}

export const EmailSchema = SchemaFactory.createForClass(Email);
