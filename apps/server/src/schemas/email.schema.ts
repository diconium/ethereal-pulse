import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Recipient, RecipientSchema } from './recipient.schema';

export type EmailDocument = HydratedDocument<Email>;

@Schema()
export class Email {
  @Prop()
  subject: string;

  @Prop()
  content: string;
  
  @Prop({ type: [RecipientSchema] })
  groups: Recipient[];
}

export const EmailSchema = SchemaFactory.createForClass(Email);