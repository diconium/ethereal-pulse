import { mongoose } from '../index';
import { UserSchema } from 'apps/server/src/database/schemas/user.schema';

const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);

export { UserModel };
