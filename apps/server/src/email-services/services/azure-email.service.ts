import { Injectable } from '@nestjs/common';
import { EmailServiceInterface } from '../interfaces/email-service.interface';
import { EmailClient, EmailMessage } from '@azure/communication-email';

@Injectable()
export class AzureEmailService implements EmailServiceInterface {
  private emailClient: EmailClient;

  configure(connectionString: string) {
    this.emailClient = new EmailClient(connectionString);
  }

  async sendEmail(
    recipients: string[],
    subject: string,
    htmlContent: string,
  ): Promise<void> {
    const message: EmailMessage = {
      senderAddress: 'sender@example.com',
      recipients: { to: recipients.map((email) => ({ address: email })) },
      subject,
      content: { html: htmlContent },
    };
    await this.emailClient.send(message);
  }
}
