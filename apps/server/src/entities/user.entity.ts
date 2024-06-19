import { model, HydratedDocument } from 'mongoose';
import { User, UserSchema } from '../database/schemas/user.schema';

export type UserDocument = HydratedDocument<User>;

export const UserModel = model<UserDocument>('User', UserSchema);
