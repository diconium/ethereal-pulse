import { DEFAULT_ETH_PULSE_ENDPOINT } from './constants/common.constants';
import {
  ICreateTemplateRequest,
  IDeleteTemplateRequest,
  IEtherealPulse,
  ISendEmailRequest,
  IUpdateTemplateRequest,
} from './IEtherealPulse';
import {
  EmailService,
  ICreateTemplate,
  IDeleteTemplate,
  IUpdateTemplate,
  TemplateDTO,
  TemplateService,
} from './services';

/**
 * Represents the EtherealPulse class that provides methods for sending emails and managing templates.
 */
export class EtherealPulse implements IEtherealPulse {
  private apiKey: string;
  private endpointURL: string;
  private emailsService: EmailService;
  private templatesService: TemplateService;

  /**
   * Creates an instance of EtherealPulse.
   * @param apiKey - The API key used for authentication.
   * @throws Error if a valid apiKey is not provided.
   */
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

  /**
   * Sends an email using the provided parameters.
   * @param request - The request object containing email details.
   * @returns A promise that resolves to the result of the email sending operation.
   */
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

  /**
   * Get the templates available
   * @returns A promise with an array with templates items
   */
  public async getTemplates(): Promise<Array<TemplateDTO>> {
    return this.templatesService.getTemplates();
  }

  /**
   * Creates a new email template using the provided parameters.
   * @param request - The request object containing email details.
   * @returns A promise that resolves the template created.
   */
  public async createTemplate(
    request: ICreateTemplateRequest,
  ): Promise<TemplateDTO> {
    const createRequest: ICreateTemplate = {
      name: request.name,
      subject: request.subject,
      html: request.html,
      headers: request.headers,
    };
    return this.templatesService.createTemplate(createRequest);
  }

  /**
   * Deletes an email template using the provided parameters.
   * @param request - The request object containing template details.
   **/
  public async deleteTemplate({
    id,
    headers,
  }: IDeleteTemplateRequest): Promise<void> {
    const createRequest: IDeleteTemplate = {
      id,
      headers,
    };
    return this.templatesService.deleteTemplate(createRequest);
  }

  public async updateTemplate(
    id: string,
    request: IUpdateTemplateRequest,
    headers?: Record<string, any>,
  ): Promise<TemplateDTO> {
    const updateTemplate: IUpdateTemplate = {
      name: request.name,
      subject: request.subject,
      html: request.html,
    };
    return this.templatesService.updateTemplate(id, updateTemplate, headers);
  }
}
