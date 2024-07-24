import { IEmailService, ISendEmailRequest } from './IEmailService';

export class EmailService implements IEmailService {
  private apiKey: string;
  private endpointURL: string;

  constructor(apiKey: string, endpointURL: string) {
    //TODO check if thios validation is real needed here, if yes move to a function in a 'utils' package or file
    if (!apiKey || (apiKey && apiKey.trim() === '')) {
      throw new Error('Failed to provide a valid apiKey!!!!!');
    }

    this.apiKey = apiKey;
    this.endpointURL = endpointURL;
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
