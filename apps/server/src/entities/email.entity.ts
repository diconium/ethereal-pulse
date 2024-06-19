import { HydratedDocument } from 'mongoose';
import { Email } from 'src/database/schemas/email.schema';

export type EmailDocument = HydratedDocument<Email>;
