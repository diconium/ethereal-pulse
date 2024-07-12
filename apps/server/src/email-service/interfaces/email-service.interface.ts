import {
  ICloudProvider,
  ICloudProviderCredentials,
} from 'src/email-service/interfaces/cloud-provider.interface';
import { SendEmailRequestDto } from '../dto/send-email.dto';

export interface IEmailService {
  processEmail(_payload: SendEmailRequestDto, _apiKey: string): Promise<any>;
}

export interface IEmailProvider {
  configure?(_provider: ICloudProvider | ICloudProviderCredentials): void;
  sendEmail(_payload: SendEmailRequestDto, _apiKey: string): Promise<any>;
}
