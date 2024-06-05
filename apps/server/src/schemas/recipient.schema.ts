import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RecipientDocument = HydratedDocument<Recipient>;

@Schema()
export class Recipient {
  @Prop({ required: true })
  email: string;
}

export const RecipientSchema = SchemaFactory.createForClass(Recipient);
