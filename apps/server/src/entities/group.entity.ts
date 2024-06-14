import { Document } from 'mongoose';
import { Recipient } from './recipient.entity';

export interface Group extends Document {
  name: string;
  recipients: Recipient[];
}
