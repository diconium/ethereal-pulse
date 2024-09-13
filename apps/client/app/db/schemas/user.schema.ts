import { Schema } from 'mongoose';
import { MODEL_NAMES } from '../constants/common.constant';

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  emailsIds: {
    type: [{ type: Schema.Types.ObjectId, ref: MODEL_NAMES.EMAIL }],
    default: [],
  },
  groupsIds: {
    type: [{ type: Schema.Types.ObjectId, ref: MODEL_NAMES.GROUP }],
    default: [],
  },
  templatesIds: {
    type: [{ type: Schema.Types.ObjectId, ref: MODEL_NAMES.TEMPLATE }],
    default: [],
  },
  apiKeysIds: {
    type: [{ type: Schema.Types.ObjectId, ref: MODEL_NAMES.APIKEY }],
    default: [],
  },
});

export { UserSchema };
