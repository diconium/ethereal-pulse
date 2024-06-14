import * as AWS from 'aws-sdk';
import { Injectable } from '@nestjs/common';
import { ICloudProvider } from 'src/email-service/interfaces/cloud-provider.interface';
import {
  IEmailService,
  ISendEmailPayload,
} from '../interfaces/email-service.interface';

@Injectable()
export class AwsEmailService implements IEmailService {
  private SES: AWS.SES;

  configure({ credentials }: ICloudProvider): void {
    this.updateAwsConfig(credentials);
    this.SES = new AWS.SES();
  }

  private updateAwsConfig(credentials: ICloudProvider['credentials']): void {
    AWS.config.update({
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
      region: 'us-west-2',
    });
  }

  async sendEmail(payload: ISendEmailPayload): Promise<void> {
    const params = this.createEmailMessage(payload);
    await this.SES.sendEmail(params).promise();
  }

  private createEmailMessage(
    payload: ISendEmailPayload,
  ): AWS.SES.SendEmailRequest {
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
