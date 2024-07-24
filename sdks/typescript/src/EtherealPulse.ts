import { DEFAULT_ETH_PULSE_ENDPOINT } from './constants/common.constants';
import { IEtherealPulse, ISendEmailRequest } from './IEtherealPulse';
import { EmailService, TemplateDTO, TemplateService } from './services';

export class EtherealPulse implements IEtherealPulse {
  private apiKey: string;
  private endpointURL: string;
  private emailsService: EmailService;
  private templatesService: TemplateService;

  constructor(apiKey: string) {
    if (!apiKey || (apiKey && apiKey.trim() === '')) {
      throw new Error('Failed to provide a valid apiKey!!!!!');
    }

    this.apiKey = apiKey;
    this.endpointURL =
      process.env.ETH_PULSE_ENDPOINT ?? DEFAULT_ETH_PULSE_ENDPOINT;

    this.emailsService = new EmailService(this.apiKey, this.endpointURL);
    this.templatesService = new TemplateService(this.apiKey, this.endpointURL);
  }

  //TODO ADD JSDOCS
  public async sendEmail({
    from,
    recipients,
    subject,
    html,
    bcc,
    cc,
    attachments,
    headers,
  }: ISendEmailRequest): Promise<any> {
    return this.emailsService.sendEmail({
      from,
      recipients,
      subject,
      html,
      bcc,
      cc,
      attachments,
      headers,
    });
  }

  public async getTemplates(): Promise<Array<TemplateDTO>> {
    return this.templatesService.getTemplates();
  }
}
