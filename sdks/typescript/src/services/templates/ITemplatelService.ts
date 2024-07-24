import { IGetTemplatesRequest, TemplateDTO } from './templateTypes';

export interface ITemplateService {
  getTemplates(_request: IGetTemplatesRequest): Promise<Array<TemplateDTO>>;
}
