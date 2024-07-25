import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema()
export class Domain {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Date, default: Date.now, required: true })
  createdAt: Date;

  @Prop({ required: true })
  region: string;

  @Prop({ type: Types.ObjectId, ref: 'apiKey', required: true })
  apiKey: Types.ObjectId;
}

export type DomainDocument = HydratedDocument<Domain>;
export const DomainSchema = SchemaFactory.createForClass(Domain);
