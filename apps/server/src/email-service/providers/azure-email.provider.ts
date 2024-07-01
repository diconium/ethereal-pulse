import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendEmailRequestDto } from '../dto/send-email.dto';
import { AZURE_CONNECTION_STRING } from 'src/config/config.constants';
import { IEmailProvider } from '../interfaces/email-service.interface';
import { EmailClient, EmailMessage } from '@azure/communication-email';

@Injectable()
export class AzureEmailProvider implements IEmailProvider {
  private emailClient: EmailClient;
  private readonly configService: ConfigService;

  constructor() {
    this.configService = new ConfigService();
  }

  configure(): void {
    const connectionString = this.configService.get<string>(
      AZURE_CONNECTION_STRING,
    );

    if (!connectionString) {
      throw new Error('Azure connection string is undefined');
    }

    this.emailClient = new EmailClient(connectionString);
  }

  async sendEmail(payload: SendEmailRequestDto): Promise<any> {
    const message = this.createEmailMessage(payload);
    const poller = await this.emailClient.beginSend(message);
    return await poller.pollUntilDone();
  }

  private createEmailMessage(payload: SendEmailRequestDto): EmailMessage {
    const { from, recipients, subject, html } = payload;
    return {
      senderAddress: from,
      recipients: { to: recipients.map((email) => ({ address: email })) },
      content: { subject, html },
    };
  }
}
