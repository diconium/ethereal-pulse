import { Injectable } from '@nestjs/common';
import { EmailServiceInterface } from '../interfaces/email-service.interface';
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsEmailService implements EmailServiceInterface {
  private SES: AWS.SES;

  configure(credentials: { accessKeyId: string; secretAccessKey: string }) {
    AWS.config.update({
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
      region: 'us-west-2',
    });
    this.SES = new AWS.SES();
  }

  async sendEmail(
    recipients: string[],
    subject: string,
    htmlContent: string,
  ): Promise<void> {
    const params = {
      Destination: { ToAddresses: recipients },
      Message: {
        Body: { Html: { Charset: 'UTF-8', Data: htmlContent } },
        Subject: { Charset: 'UTF-8', Data: subject },
      },
      Source: 'sender@example.com',
    };

    await this.SES.sendEmail(params).promise();
  }
}
