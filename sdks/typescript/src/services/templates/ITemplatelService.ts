import {
  ICreateTemplate,
  IDeleteTemplate,
  IGetTemplatesRequest,
  TemplateDTO,
} from './templateTypes';

export interface ITemplateService {
  getTemplates(_request: IGetTemplatesRequest): Promise<Array<TemplateDTO>>;
  createTemplate({
    name,
    subject,
    html,
    headers,
  }: ICreateTemplate): Promise<TemplateDTO>;
  deleteTemplate({ id, headers }: IDeleteTemplate): Promise<void>;
}
