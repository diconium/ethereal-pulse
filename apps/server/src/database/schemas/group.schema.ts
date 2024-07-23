import { HydratedDocument, Types } from 'mongoose';
import { MODEL_NAMES } from '../constants/common.constant';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RecipientSchema, Recipient } from './recipient.schema';

export type GroupDocument = HydratedDocument<Group>;

@Schema()
export class Group {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [RecipientSchema], required: true })
  recipients: Recipient[];

  @Prop({
    type: Types.ObjectId,
    ref: MODEL_NAMES.USER,
    required: true,
  })
  userId: Types.ObjectId;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
