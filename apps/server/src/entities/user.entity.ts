import { Schema, model, HydratedDocument } from 'mongoose';
import { Group } from './group.entity';
import { Email } from './email.entity';
import { ApiKey } from './api-key.entity';
import { Template } from './template.entity';
import { ICloudProvider } from '../email-service/interfaces/cloud-provider.interface';

export interface User {
  email: string;
  emails: Email[];
  groups: Group[];
  password: string;
  apiKeys: ApiKey[];
  templates: Template[];
  providers: ICloudProvider[];
}

export type UserDocument = HydratedDocument<User>;

const userSchema = new Schema<User>({
  email: { type: String, required: true },
  emails: [{ type: Schema.Types.ObjectId, ref: 'Email' }],
  groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
  password: { type: String, required: true },
  apiKeys: [{ type: Schema.Types.ObjectId, ref: 'ApiKey' }],
  templates: [{ type: Schema.Types.ObjectId, ref: 'Template' }],
  providers: [{ type: Schema.Types.Mixed }],
});

export const UserModel = model<UserDocument>('User', userSchema);
