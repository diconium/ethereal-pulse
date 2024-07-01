import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { SendEmailRequestDto } from '../dto/send-email.dto';
import { IEmailProvider } from '../interfaces/email-service.interface';
import {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_CFG_REGION,
} from '../../config/config.constants';
import { validateOrReject } from 'class-validator';

@Injectable()
export class AwsEmailProvider implements IEmailProvider {
  private readonly configService: ConfigService;
  private SES: AWS.SES;

  constructor() {
    this.configService = new ConfigService();
  }

  configure(): void {
    this.updateAwsConfig();
    this.SES = new AWS.SES();
  }

  private updateAwsConfig(): void {
    const accessKeyId = this.configService.get<string>(AWS_ACCESS_KEY_ID);
    const secretAccessKey = this.configService.get<string>(
      AWS_SECRET_ACCESS_KEY,
    );
    const region =
      this.configService.get<string>(AWS_CFG_REGION) ?? 'us-west-2';

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
