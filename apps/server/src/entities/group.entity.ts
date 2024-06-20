import { HydratedDocument } from 'mongoose';
import { Recipient } from './recipient.entity';

export interface Group {
  name: string;
  recipients: Recipient[];
}

export type GroupDocument = HydratedDocument<Group>;
