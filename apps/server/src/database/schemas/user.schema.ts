import { HydratedDocument } from 'mongoose';
import { Group, GroupSchema } from './group.schema';
import { EmailSchema, Email } from './email.schema';
import { ApiKeySchema, ApiKey } from './api-key.schema';
import { Template, TemplateSchema } from './template.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CloudProvider, CloudProviderSchema } from './cloud-provider.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

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

  @Prop({ type: [CloudProviderSchema], default: [] })
  providers: CloudProvider[];

  @Prop({ type: [ApiKeySchema], default: [] })
  apiKeys: ApiKey[];
}

export const UserSchema = SchemaFactory.createForClass(User);
