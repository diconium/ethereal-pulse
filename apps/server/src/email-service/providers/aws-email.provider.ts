import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { validateOrReject } from 'class-validator';
import { Inject, Injectable } from '@nestjs/common';
import { SendEmailRequestDto } from '../dto/send-email.dto';
import { IEmailProvider } from '../interfaces/email-service.interface';

@Injectable()
export class AwsEmailProvider implements IEmailProvider {
  private SES: AWS.SES;

  constructor(
    @Inject(ConfigService) private readonly _configService: ConfigService,
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

  async sendEmail(payload: SendEmailRequestDto): Promise<void> {
    const params = await this.createEmailMessage(payload);
    await this.SES.sendEmail(params).promise();
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
