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

export interface IEmailService {
  sendEmail(_request: ISendEmailRequest): Promise<any>;
}
