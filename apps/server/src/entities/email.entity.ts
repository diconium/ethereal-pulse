import { Document } from 'mongoose';

export interface Email extends Document {
  cc?: string[];
  bcc?: string[];
  subject: string;
  content: string;
  recipients: string[];
}
