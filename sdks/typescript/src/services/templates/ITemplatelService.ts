import { ICreateTemplate, IUpdateTemplate, TemplateDTO } from './templateTypes';

export interface ITemplateService {
  getTemplates(
    headersOptions?: Record<string, any>,
  ): Promise<Array<TemplateDTO>>;
  createTemplate(
    { name, subject, html }: ICreateTemplate,
    headersOptions?: Record<string, any>,
  ): Promise<TemplateDTO>;
  deleteTemplate(
    id: string,
    headersOptions?: Record<string, any>,
  ): Promise<void>;
  updateTemplate(
    id: string,
    request: IUpdateTemplate,
    headersOptions?: Record<string, any>,
  ): Promise<TemplateDTO>;
}
