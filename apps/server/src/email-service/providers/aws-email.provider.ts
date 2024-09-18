import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { validateOrReject } from 'class-validator';
import { Inject, Injectable } from '@nestjs/common';
import { SendEmailRequestDto } from '../dto/send-email.dto';
import { IEmailProvider } from '../interfaces/email-service.interface';
import { EmailPersistenceService } from '../services/email-persistence.service';
import { SendEmailResponse } from 'aws-sdk/clients/ses';

@Injectable()
export class AwsEmailProvider implements IEmailProvider {
  private SES: AWS.SES;

  constructor(
    @Inject(ConfigService) private readonly _configService: ConfigService,
    private readonly _emailPersistenceService: EmailPersistenceService,
  ) {}

  configure(): void {
    this.updateAwsConfig();
    this.SES = new AWS.SES();
  }

  private updateAwsConfig(): void {
    const accessKeyId = this._configService.get<string>(
      'providers.aws.accessKeyId',
    );
    const secretAccessKey = this._configService.get<string>(
      'providers.aws.secretAccessKey',
    );
    const region =
      this._configService.get<string>('providers.aws.region') ?? 'us-west-2';

    if (!accessKeyId || !secretAccessKey) {
      throw new Error(
        'AWS access key ID and secret access key must be set in the environment variables.',
      );
    }

    AWS.config.update({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      region: region,
    });
  }

  async sendEmail(
    payload: SendEmailRequestDto,
  ): Promise<SendEmailResponse | AWS.AWSError> {
    const params = await this.createEmailMessage(payload);
    const response = await this.SES.sendEmail(params).promise();

    await this._emailPersistenceService.persistEmailWithResponse(payload, {
      id: response.MessageId,
      status: 'Succeeded',
    });

    return response;
  }

  private async createEmailMessage(
    payload: SendEmailRequestDto,
  ): Promise<AWS.SES.SendEmailRequest> {
    await validateOrReject(payload);

    const { from, recipients, subject, html } = payload;

    return {
      Destination: { ToAddresses: recipients },
      Message: {
        Body: { Html: { Charset: 'UTF-8', Data: html } },
        Subject: { Charset: 'UTF-8', Data: subject },
      },
      Source: from,
    };
  }
}
