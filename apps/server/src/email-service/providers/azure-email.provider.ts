import { ConfigService } from '@nestjs/config';
import { validateOrReject } from 'class-validator';
import { Inject, Injectable } from '@nestjs/common';
import { SendEmailRequestDto } from '../dto/send-email.dto';
import { AzureEmailResponse } from '../interfaces/azure.interface';
import { IEmailErrorResponse } from '../interfaces/email.interface';
import { IEmailProvider } from '../interfaces/email-service.interface';
import { EmailClient, EmailMessage } from '@azure/communication-email';
import { EmailPersistenceService } from '../services/email-persistence.service';

@Injectable()
export class AzureEmailProvider implements IEmailProvider {
  private emailClient: EmailClient;

  constructor(
    @Inject(ConfigService) private readonly _configService: ConfigService,
    private readonly _emailPersistenceService: EmailPersistenceService,
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
    const response = (await poller.pollUntilDone()) as
      | AzureEmailResponse
      | IEmailErrorResponse;

    if ('id' in response && 'status' in response) {
      await this._emailPersistenceService.persistEmailWithResponse(
        payload,
        response,
      );
    }

    return response;
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
