import { Document } from 'mongoose';

export interface Template extends Document {
  name: string;
  subject: string;
  html: string;
}
