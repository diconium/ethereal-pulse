import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RecipientDocument = HydratedDocument<Recipient>;

@Schema()
export class Recipient {
  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String })
  firstName: string;

  @Prop({ type: String })
  lastName: string;

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;

  @Prop({ type: Boolean, default: false })
  unsubscribed: boolean;
}

export const RecipientSchema = SchemaFactory.createForClass(Recipient);
