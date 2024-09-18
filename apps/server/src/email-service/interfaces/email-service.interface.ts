import {
  ICloudProvider,
  ICloudProviderCredentials,
} from 'src/email-service/interfaces/cloud-provider.interface';
import { SendEmailRequestDto } from '../dto/send-email.dto';

export interface IEmailService {
  processEmail(
    userId: string,
    _apiKey: string,
    _payload: SendEmailRequestDto,
  ): Promise<unknown>;
}

export interface IEmailProvider {
  configure?(_provider: ICloudProvider | ICloudProviderCredentials): void;
  sendEmail(_payload: SendEmailRequestDto, _apiKey: string): Promise<unknown>;
}
