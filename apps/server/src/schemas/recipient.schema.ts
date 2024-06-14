import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RecipientDocument = HydratedDocument<Recipient>;

@Schema()
export class Recipient {
  @Prop({ required: true })
  email: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: false })
  unsubscribed: boolean;
}

export const RecipientSchema = SchemaFactory.createForClass(Recipient);
