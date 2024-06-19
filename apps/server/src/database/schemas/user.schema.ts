import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Email' }],
    default: [],
  })
  emails: Types.ObjectId[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Group' }],
    default: [],
  })
  groups: Types.ObjectId[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Template' }],
    default: [],
  })
  templates: Types.ObjectId[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'CloudProvider' }],
    default: [],
  })
  providers: Types.ObjectId[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'ApiKey' }],
    default: [],
  })
  apiKeys: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
