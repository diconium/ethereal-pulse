import { SendEmailRequestDto } from '../dto/send-email.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IEmailService } from '../interfaces/email-service.interface';
import { ICloudProvider } from '../interfaces/cloud-provider.interface';
import { EmailServiceFactory } from '../factories/email-service.factory';

@Injectable()
export class EmailService implements IEmailService {
  private emailService: IEmailService;

  constructor(private readonly emailServiceFactory: EmailServiceFactory) {}

  async sendEmail(payload: SendEmailRequestDto, apiKey: string): Promise<any> {
    const providerName = null; // TODO: get env provider name
    this.emailService = this.getEmailService(providerName);

    await this.emailService.sendEmail(payload, apiKey);
  }

  private getEmailService(provider: ICloudProvider): IEmailService {
    // TODO: update or remove argument
    const emailService = this.emailServiceFactory.createEmailService(provider);
    if (!emailService) throw new Error('Email provider not set');
    return emailService;
  }
}
