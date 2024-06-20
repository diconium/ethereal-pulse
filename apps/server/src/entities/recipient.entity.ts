import { HydratedDocument } from 'mongoose';

export interface Recipient {
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt?: Date;
  unsubscribed?: boolean;
}

export type RecipientDocument = HydratedDocument<Recipient>;
