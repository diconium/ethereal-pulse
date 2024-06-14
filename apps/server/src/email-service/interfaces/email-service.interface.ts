import {
  ICloudProvider,
  ICloudProviderCredentials,
} from 'src/email-service/interfaces/cloud-provider.interface';

export interface IEmailService {
  configure?(provider: ICloudProvider | ICloudProviderCredentials): void;
  sendEmail(payload: ISendEmailPayload, apiKey: string): Promise<any>;
}

export interface ISendEmailPayload {
  from: string;
  recipients: string[];
  subject: string;
  html: string;
  bcc?: string[];
  cc?: string[];
  headers?: object;
  attachments?: object[];
}

export interface ISendEmailResponse {
  wip: string;
  // TOOD: get and update this interface props
}
