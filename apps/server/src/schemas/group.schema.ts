import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Recipient, RecipientSchema } from './recipient.schema';

export type GroupDocument = HydratedDocument<Group>;

@Schema()
export class Group {
  @Prop()
  name: string;
  
  @Prop({ type: [RecipientSchema], default: [] })
  groups: Recipient[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);