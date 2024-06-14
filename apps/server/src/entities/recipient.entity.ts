import { Document } from 'mongoose';

export interface Recipient extends Document {
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt?: Date;
  unsubscribed?: boolean;
}
