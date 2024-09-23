import { HydratedDocument } from 'mongoose';
import { Domain } from 'src/database/schemas/domain.schema';

export type DomainDocument = HydratedDocument<Domain>;
