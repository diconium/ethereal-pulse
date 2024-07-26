import { MODEL_NAMES } from '../constants/common.constant';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: MODEL_NAMES.EMAIL }],
    default: [],
  })
  emailsIds: Types.ObjectId[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: MODEL_NAMES.GROUP }],
    default: [],
  })
  groupsIds: Types.ObjectId[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: MODEL_NAMES.TEMPLATE }],
    default: [],
  })
  templatesIds: Types.ObjectId[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: MODEL_NAMES.APIKEY }],
    default: [],
  })
  apiKeysIds: Types.ObjectId[];
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
