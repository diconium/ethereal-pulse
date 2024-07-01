import {
  ICloudProvider,
  ICloudProviderCredentials,
} from 'src/email-service/interfaces/cloud-provider.interface';
import { SendEmailRequestDto } from '../dto/send-email.dto';

export interface IEmailService {
  processEmail(payload: SendEmailRequestDto, apiKey: string): Promise<any>;
}

export interface IEmailProvider {
  configure?(provider: ICloudProvider | ICloudProviderCredentials): void;
  sendEmail(payload: SendEmailRequestDto, apiKey: string): Promise<any>;
}
