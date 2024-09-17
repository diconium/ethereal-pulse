import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IEmail } from 'src/email-service/interfaces/email.interface';
import { AzureEmailStatus } from 'src/email-service/interfaces/azure.interface';

@Schema()
export class Email implements IEmail {
  @Prop({ type: String, required: true })
  from: string;

  @Prop({ type: [String], required: true })
  recipients: string[];

  @Prop({ type: String, required: true })
  subject: string;

  @Prop({ type: String, required: true })
  html: string;

  @Prop({ type: [String] })
  bcc?: string[];

  @Prop({ type: [String] })
  cc?: string[];

  @Prop({ type: Object, default: {} })
  headers?: object;

  @Prop({ type: [Object], default: [] })
  attachments?: object[];

  @Prop({ type: String, default: 'NotStarted' })
  status: AzureEmailStatus;

  @Prop({ type: String })
  deliveryID?: string;
}

export type EmailDocument = HydratedDocument<Email>;
export const EmailSchema = SchemaFactory.createForClass(Email);
