import {
  ICloudProvider,
  ICloudProviderCredentials,
} from 'src/email-service/interfaces/cloud-provider.interface';
import { SendEmailRequestDto } from '../dto/send-email.dto';

export interface IEmailService {
  configure?(provider: ICloudProvider | ICloudProviderCredentials): void;
  sendEmail(payload: SendEmailRequestDto, apiKey: string): Promise<any>;
}
