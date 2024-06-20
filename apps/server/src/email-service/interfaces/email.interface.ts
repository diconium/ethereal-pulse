export interface IEmail {
  from: string;
  html: string;
  cc?: string[];
  bcc?: string[];
  subject: string;
  headers?: object;
  recipients: string[];
  attachments?: object[];
}
