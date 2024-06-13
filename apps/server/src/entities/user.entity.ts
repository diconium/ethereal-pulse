import { Document } from 'mongoose';

export interface User extends Document {
  username: string;
  apiKey: string[]; // WIP: updated to string[] check your use in the app
  createdAt: Date;
  providers: {
    type: string;
    credentials: {
      connectionString?: string;
      accessKeyId?: string;
      secretAccessKey?: string;
    };
  }[];
}
