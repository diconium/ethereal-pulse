import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IEmail } from 'src/email-service/interfaces/email.interface';

@Schema()
export class Email implements IEmail {
  @Prop({ required: true })
  from: string;

  @Prop({ type: [String], required: true })
  recipients: string[];

  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  html: string;

  @Prop([String])
  bcc?: string[];

  @Prop([String])
  cc?: string[];

  @Prop({ type: Object, default: {} })
  headers?: object;

  @Prop({ type: [Object], default: [] })
  attachments?: object[];
}

export const EmailSchema = SchemaFactory.createForClass(Email);
