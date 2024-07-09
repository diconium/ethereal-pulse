import {
  IEtherealPulse,
  ISendEmailRequest,
} from './interfaces/email-services.interface';
import { DEFAULT_BASE_URL } from './constants/common.constants';

class EtherealPulse implements IEtherealPulse {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrl = process.env.BASE_URL ?? DEFAULT_BASE_URL;
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
      const response = await fetch(`${this.baseUrl}/email/send`, {
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

export default EtherealPulse;
