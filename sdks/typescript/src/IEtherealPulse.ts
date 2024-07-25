import { TemplateDTO } from './services';

export interface ISendEmailRequest {
  from: string;
  recipients: string[];
  subject: string;
  html: string;
  bcc?: string[];
  cc?: string[];
  headers?: Record<string, any>;
  attachments?: Record<string, any>[];
}

export interface ICreateTemplateRequest {
  name: string;
  subject: string;
  html: string;
  headers?: Record<string, any>;
}
export interface IDeleteTemplateRequest {
  id: string;
  headers?: Record<string, any>;
}

export interface IEtherealPulse {
  sendEmail(_request: ISendEmailRequest): Promise<any>;
  getTemplates(): Promise<Array<TemplateDTO>>;
  createTemplate(request: ICreateTemplateRequest): Promise<TemplateDTO>;
  deleteTemplate({ id, headers }: IDeleteTemplateRequest): Promise<void>;
}
