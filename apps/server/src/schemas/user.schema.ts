import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Email, EmailSchema } from './email.schema';
import { Group, GroupSchema } from './group.schema';
import { Template, TemplateSchema } from './template.schema';
import { ApiKey, ApiKeySchema } from './apiKey.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [EmailSchema], default: [] })
  emails: Email[];

  @Prop({ type: [GroupSchema], default: [] })
  groups: Group[];

  @Prop({ type: [TemplateSchema], default: [] })
  templates: Template[];

  @Prop({ type: [ApiKeySchema], default: [] })
  apiKeys: ApiKey[];
}

export const UserSchema = SchemaFactory.createForClass(User);
