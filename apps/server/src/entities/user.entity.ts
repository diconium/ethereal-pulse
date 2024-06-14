import { Document } from 'mongoose';
import { Group } from './group.entity';
import { Email } from './email.entity';
import { ApiKey } from './api-key.entity';
import { Template } from './template.entity';
import { CloudProvider } from './cloud-provider.entity';

export interface User extends Document {
  email: string;
  emails: Email[];
  groups: Group[];
  password: string;
  apiKeys: ApiKey[];
  templates: Template[];
  providers: CloudProvider[];
}
