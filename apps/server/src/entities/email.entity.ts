import { HydratedDocument } from 'mongoose';

export interface Email {
  from: string;
  html: string;
  cc?: string[];
  bcc?: string[];
  subject: string;
  headers?: object;
  recipients: string[];
  attachments?: object[];
}

export type EmailDocument = HydratedDocument<Email>;
