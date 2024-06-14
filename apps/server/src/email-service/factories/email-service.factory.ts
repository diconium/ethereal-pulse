import { Injectable } from '@nestjs/common';
import { AwsEmailService } from '../services/aws-email.service';
import { AzureEmailService } from '../services/azure-email.service';
import {
  CloudProviderType,
  ICloudProvider,
} from 'src/entities/cloud-provider.entity';
import { IEmailService } from '../interfaces/email-service.interface';
import { EMAIL_PROVIDERS } from '../constants/email-providers.constants';
import { EtherealEmailService } from '../services/ethereal-email.service';

@Injectable()
export class EmailServiceFactory {
  createEmailService(provider: ICloudProvider): IEmailService {
    const emailService = this.getEmailServiceInstance(provider.type);
    this.configureEmailService(emailService, provider);
    return emailService;
  }

  private getEmailServiceInstance(type: CloudProviderType): IEmailService {
    switch (type) {
      case EMAIL_PROVIDERS.AZURE:
        return new AzureEmailService();
      case EMAIL_PROVIDERS.AWS:
        return new AwsEmailService();
      case EMAIL_PROVIDERS.ETHEREAL:
        return new EtherealEmailService();
      default:
        throw new Error('Unsupported email provider');
    }
  }

  private configureEmailService(
    emailService: IEmailService,
    provider: ICloudProvider,
  ): void {
    if (
      emailService instanceof AzureEmailService ||
      emailService instanceof AwsEmailService
    ) {
      emailService.configure(provider);
    }
  }
}
