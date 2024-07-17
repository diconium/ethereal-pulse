import { DEFAULT_ETH_PULSE_ENDPOINT } from './constants/common.constants';
import {
  IEtherealPulse,
  ISendEmailRequest,
} from './interfaces/email-services.interface';

export class EtherealPulse implements IEtherealPulse {
  private apiKey: string;
  private endpointURL: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.endpointURL =
      process.env.ETH_PULSE_ENDPOINT ?? DEFAULT_ETH_PULSE_ENDPOINT;
  }

  private createRequestBody({
    from,
    recipients,
    subject,
    html,
    bcc,
    cc,
    attachments,
  }: ISendEmailRequest): Partial<ISendEmailRequest> {
    const requestBody: Partial<ISendEmailRequest> = {
      from,
      recipients,
      subject,
      html,
    };

    if (bcc) {
      requestBody.bcc = bcc;
    }
    if (cc) {
      requestBody.cc = cc;
    }
    if (attachments) {
      requestBody.attachments = attachments;
    }

    return requestBody;
  }

  private async handleError(response: Response) {
    const errorMessage = await response.text();
    throw new Error(`Failed to send email: ${errorMessage}`);
  }

  async sendEmail({
    from,
    recipients,
    subject,
    html,
    bcc,
    cc,
    attachments,
    headers,
  }: ISendEmailRequest) {
    const requestBody = this.createRequestBody({
      from,
      recipients,
      subject,
      html,
      bcc,
      cc,
      attachments,
    });

    try {
      const response = await fetch(`${this.endpointURL}/email/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          ...headers,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        await this.handleError(response);
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }
}
