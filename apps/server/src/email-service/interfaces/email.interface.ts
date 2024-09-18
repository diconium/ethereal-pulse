import { AzureEmailStatus } from './azure.interface';

export interface IEmail {
  from: string;
  html: string;
  cc?: string[];
  bcc?: string[];
  subject: string;
  headers?: object;
  recipients: string[];
  attachments?: object[];
  status: AzureEmailStatus;
  deliveryID?: string;
}

export interface IEmailErrorResponse {
  error?: string;
  message: string;
  statusCode: number;
}
