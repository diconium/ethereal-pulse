import {
  ICloudProvider,
  ICloudProviderCredentials,
} from 'src/entities/cloud-provider.entity';

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
  ccc?: string[];
  headers?: object;
  attachments?: object[];
}

export interface ISendEmailResponse {
  wip: string;
  // TOOD: get and update this interface props
}
