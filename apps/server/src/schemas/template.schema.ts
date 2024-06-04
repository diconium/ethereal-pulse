import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TemplateDocument = HydratedDocument<Template>;

@Schema()
export class Template {
  @Prop()
  name: string;

  @Prop()
  subject: string;

  @Prop()
  content: string;
}

export const TemplateSchema = SchemaFactory.createForClass(Template);