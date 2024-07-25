import { DEFAULT_ETH_PULSE_ENDPOINT } from './constants/common.constants';
import {
  ICreateTemplateRequest,
  IEtherealPulse,
  ISendEmailRequest,
  IUpdateTemplateRequest,
} from './IEtherealPulse';
import {
  EmailService,
  ICreateTemplate,
  IUpdateTemplate,
  TemplateDTO,
  TemplateService,
} from './services';

export class EtherealPulse implements IEtherealPulse {
  private apiKey: string;
  private endpointURL: string;
  private emailsService: EmailService;
  private templatesService: TemplateService;

  /**
   * Creates an instance of EtherealPulse.
   * @param {string} apiKey - The API key for authentication.
   * @throws Will throw an error if the apiKey is invalid.
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
   * Sends an email.
   * @param {ISendEmailRequest} request - The email request object.
   * @param {Record<string, any>} [headers] - Optional headers.
   * @returns {Promise<any>} - A promise that resolves when the email is sent.
   */
  public async sendEmail(
    {
      from,
      recipients,
      subject,
      html,
      bcc,
      cc,
      attachments,
    }: ISendEmailRequest,
    headers?: Record<string, any>,
  ): Promise<any> {
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
   * Retrieves all templates.
   * @param {Record<string, any>} [headers] - Optional headers.
   * @returns {Promise<Array<TemplateDTO>>} - A promise that resolves to an array of templates.
   */
  public async getTemplates(
    headers?: Record<string, any>,
  ): Promise<Array<TemplateDTO>> {
    return this.templatesService.getTemplates(headers);
  }

  /**
   * Creates a new template.
   * @param {ICreateTemplateRequest} request - The create template request object.
   * @param {Record<string, any>} [headers] - Optional headers.
   * @returns {Promise<TemplateDTO>} - A promise that resolves to the created template.
   */
  public async createTemplate(
    request: ICreateTemplateRequest,
    headers?: Record<string, any>,
  ): Promise<TemplateDTO> {
    const createRequest: ICreateTemplate = {
      name: request.name,
      subject: request.subject,
      html: request.html,
    };
    return this.templatesService.createTemplate(createRequest, headers);
  }

  /**
   * Deletes a template.
   * @param {string} id - The ID of the template to delete.
   * @param {Record<string, any>} [headers] - Optional headers.
   * @returns {Promise<void>} - A promise that resolves when the template is deleted.
   */
  public async deleteTemplate(
    id: string,
    headers?: Record<string, any>,
  ): Promise<void> {
    return this.templatesService.deleteTemplate(id, headers);
  }

  /**
   * Updates a template.
   * @param {string} id - The ID of the template to update.
   * @param {IUpdateTemplateRequest} request - The update template request object.
   * @param {Record<string, any>} [headers] - Optional headers.
   * @returns {Promise<TemplateDTO>} - A promise that resolves to the updated template.
   */
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
