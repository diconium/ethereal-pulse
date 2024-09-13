import { mongoose } from '../index';
import { UserSchema } from '../schemas/user.schema';

const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);

export { UserModel };
