import { ConfigService } from '@nestjs/config';
import { validateOrReject } from 'class-validator';
import { Inject, Injectable } from '@nestjs/common';
import { SendEmailRequestDto } from '../dto/send-email.dto';
import { AzureEmailResponse } from '../interfaces/azure.interface';
import { IEmailErrorResponse } from '../interfaces/email.interface';
import { IEmailProvider } from '../interfaces/email-service.interface';
import { EmailClient, EmailMessage } from '@azure/communication-email';

@Injectable()
export class AzureEmailProvider implements IEmailProvider {
  private emailClient: EmailClient;

  constructor(
    @Inject(ConfigService) private readonly _configService: ConfigService,
  ) {}

  configure(): void {
    const connectionString = this._configService.get<string>(
      'providers.azure.connectionString',
    );

    if (!connectionString) {
      throw new Error('Azure connection string is undefined');
    }

    this.emailClient = new EmailClient(connectionString);
  }

  async sendEmail(
    payload: SendEmailRequestDto,
  ): Promise<AzureEmailResponse | IEmailErrorResponse> {
    const message = await this.createEmailMessage(payload);
    const poller = await this.emailClient.beginSend(message);
    return (await poller.pollUntilDone()) as
      | AzureEmailResponse
      | IEmailErrorResponse;
  }

  private async createEmailMessage(
    payload: SendEmailRequestDto,
  ): Promise<EmailMessage> {
    await validateOrReject(payload);

    const { from, recipients, subject, html } = payload;

    return {
      senderAddress: from,
      content: { subject, html },
      recipients: { to: recipients.map((email) => ({ address: email })) },
    };
  }
}
