import { TemplateDTO } from './services';

export interface ISendEmailRequest {
  from: string;
  recipients: string[];
  subject: string;
  html: string;
  bcc?: string[];
  cc?: string[];
  attachments?: Record<string, any>[];
}

export interface ICreateTemplateRequest {
  name: string;
  subject: string;
  html: string;
}
export interface IUpdateTemplateRequest {
  name: string;
  subject: string;
  html: string;
}

export interface IEtherealPulse {
  sendEmail(
    _request: ISendEmailRequest,
    headersOptions?: Record<string, any>,
  ): Promise<any>;
  getTemplates(
    headersOptions?: Record<string, any>,
  ): Promise<Array<TemplateDTO>>;
  createTemplate(
    request: ICreateTemplateRequest,
    headersOptions?: Record<string, any>,
  ): Promise<TemplateDTO>;
  deleteTemplate(
    id: string,
    headersOptions?: Record<string, any>,
  ): Promise<void>;
  updateTemplate(
    id: string,
    request: IUpdateTemplateRequest,
    headers?: Record<string, any>,
  ): Promise<TemplateDTO>;
}
