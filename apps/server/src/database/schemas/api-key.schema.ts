import { Schema } from 'mongoose';

export const ApiKeySchema = new Schema({
  name: { type: String, required: true },
  permission: {
    type: String,
    enum: ['full_access', 'sending_access'],
    required: true,
  },
  provider: { type: String, required: true }, // TODO:
  createdAt: { type: Date, default: Date.now },
});
