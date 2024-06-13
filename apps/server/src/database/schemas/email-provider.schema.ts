import { Schema } from 'mongoose';

export const EmailProviderSchema = new Schema({
  type: { type: String, required: true },
});

export const ProviderConnectionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  provider: { type: Schema.Types.ObjectId, ref: 'EmailProvider' },
});
