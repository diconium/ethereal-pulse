import { HydratedDocument } from 'mongoose';
import { ApiKey } from 'src/database/schemas/api-key.schema';

export type ApiKeyDocument = HydratedDocument<ApiKey>;
