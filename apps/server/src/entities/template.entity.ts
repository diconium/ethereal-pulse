import { HydratedDocument } from 'mongoose';

export interface Template {
  name: string;
  subject: string;
  html: string;
}

export type TemplateDocument = HydratedDocument<Template>;
