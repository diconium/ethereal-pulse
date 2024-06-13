import { Injectable } from '@nestjs/common';
import { AwsEmailService } from '../services/aws-email.service';
import { AzureEmailService } from '../services/azure-email.service';
import { EtherealEmailService } from '../services/ethereal-email.service';
import { EmailServiceInterface } from '../interfaces/email-service.interface';

@Injectable()
export class EmailServiceFactory {
  createEmailService(provider: {
    type: string;
    credentials: any;
  }): EmailServiceInterface {
    let emailService: EmailServiceInterface;

    switch (provider.type) {
      case 'azure':
        emailService = new AzureEmailService();
        (emailService as AzureEmailService).configure(
          provider.credentials.connectionString,
        );
        break;
      case 'aws':
        emailService = new AwsEmailService();
        (emailService as AwsEmailService).configure(provider.credentials);
        break;
      case 'ethereal':
        emailService = new EtherealEmailService();
        (emailService as EtherealEmailService).configure(provider.credentials);
        break;
      default:
        throw new Error('Unsupported email provider');
    }
    return emailService;
  }
}
