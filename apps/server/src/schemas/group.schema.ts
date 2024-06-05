import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Recipient, RecipientSchema } from './recipient.schema';

export type GroupDocument = HydratedDocument<Group>;

@Schema()
export class Group {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [RecipientSchema], required: true })
  recipients: Recipient[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
