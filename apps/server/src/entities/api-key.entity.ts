import { Schema, Document } from 'mongoose';

export interface ApiKey extends Document {
  name: string;
  permission: 'full_access' | 'sending_access';
  provider: string; // The new field for provider
  createdAt: Date;
}
// TODO: move this interface to another
