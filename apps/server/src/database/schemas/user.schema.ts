import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  username: { type: String, required: true },
  apiKey: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  providers: [
    {
      type: { type: String, required: true },
      credentials: {
        connectionString: { type: String },
        accessKeyId: { type: String },
        secretAccessKey: { type: String },
      },
    },
  ],
});
