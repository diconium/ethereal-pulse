import mongoose, { model } from 'mongoose';
import { UserSchema } from 'apps/server/src/database/schemas/user.schema';

const uri = process.env.USER_MONGODB_URI;

if (!uri) {
  throw new Error('USER_MONGODB_URI is not defined');
}

mongoose.connect(uri);

const UserModel = model('User', UserSchema);

export { mongoose, UserModel };
