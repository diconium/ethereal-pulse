import axios, { AxiosError } from "axios";
import {
  IEtherealPulse,
  ISendEmailRequest,
} from "./interfaces/email-services.interface";

class EtherealPulse implements IEtherealPulse {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrl = process.env.BASE_URL || "https://api.yourdomain.com/v1";
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

    if (bcc) requestBody.bcc = bcc;
    if (cc) requestBody.cc = cc;
    if (attachments) requestBody.attachments = attachments;

    return requestBody;
  }

  private handleError(error: AxiosError) {
    const errorMessage = error.response ? error.response.data : error.message;
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
      const response = await axios.post(
        `${this.baseUrl}/email/send`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": this.apiKey,
            ...headers,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      this.handleError(error);
    }
  }
}

export default EtherealPulse;
