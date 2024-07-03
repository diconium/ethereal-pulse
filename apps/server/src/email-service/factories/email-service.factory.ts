import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AwsEmailService } from '../services/aws-email.service';
import { AzureEmailService } from '../services/azure-email.service';
import {
  CloudProviderType,
  ICloudProvider,
} from 'src/email-service/interfaces/cloud-provider.interface';
import { IEmailService } from '../interfaces/email-service.interface';
import { EMAIL_PROVIDERS } from '../constants/email-providers.constants';
import { EtherealEmailService } from '../services/ethereal-email.service';

@Injectable()
export class EmailServiceFactory {
  constructor(
    @Inject(ConfigService) private readonly _configService: ConfigService,
  ) {}

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
        return new EtherealEmailService(this._configService);
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
