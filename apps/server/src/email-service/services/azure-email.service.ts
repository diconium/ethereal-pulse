import { Injectable } from '@nestjs/common';
import { SendEmailRequestDto } from '../dto/send-email.dto';
import { IEmailService } from '../interfaces/email-service.interface';
import { EmailClient, EmailMessage } from '@azure/communication-email';
import { ICloudProvider } from 'src/email-service/interfaces/cloud-provider.interface';

@Injectable()
export class AzureEmailService implements IEmailService {
  private emailClient: EmailClient;

  configure({ credentials }: ICloudProvider): void {
    const connectionString = credentials?.connectionString;
    if (!connectionString) {
      throw new Error('Connection string is undefined');
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
