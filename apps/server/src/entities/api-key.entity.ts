import { Document } from 'mongoose';
import { CloudProvider } from './cloud-provider.entity';

export interface ApiKey extends Document {
  name: string;
  createdAt: Date;
  provider: CloudProvider;
  permission: 'full_access' | 'sending_access';
}
