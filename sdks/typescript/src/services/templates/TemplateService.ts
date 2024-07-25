import { ITemplateService } from './ITemplatelService';
import { TemplateServiceMapper } from './TemplateServiceMapper';
import {
  ICreateTemplate,
  IDeleteTemplate,
  IGetTemplatesRequest,
  TemplateCreateResponseDTO,
  TemplateDTO,
  TemplateResponseDTO,
} from './templateTypes';

export class TemplateService implements ITemplateService {
  private apiKey: string;
  private endpointURL: string;
  private static readonly BASE_TEMPLATES_ENDPOINT = 'templates';
  constructor(apiKey: string, endpointURL: string) {
    //TODO check if thios validation is real needed here, if yes move to a function in a 'utils' package or file
    if (!apiKey || (apiKey && apiKey.trim() === '')) {
      throw new Error('Failed to provide a valid apiKey!!!!!');
    }

    this.apiKey = apiKey;
    this.endpointURL = endpointURL;
  }

  async getTemplates({ headers }: IGetTemplatesRequest = {}): Promise<
    Array<TemplateDTO>
  > {
    try {
      const response = await fetch(
        `${this.endpointURL}/${TemplateService.BASE_TEMPLATES_ENDPOINT}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': this.apiKey,
            ...headers,
          },
        },
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
      const responseData: Array<TemplateResponseDTO> = await response.json();

      return TemplateServiceMapper.mapTemplateArrayJsonToArrayTemplateDTO(
        responseData,
      );
    } catch (error: any) {
      throw new Error(`Failed to fetch email templates: ${error.message}`);
    }
  }

  async createTemplate({
    name,
    subject,
    html,
    headers,
  }: ICreateTemplate): Promise<TemplateDTO> {
    const requestBody: ICreateTemplate = {
      name,
      subject,
      html,
    };

    try {
      const response = await fetch(
        `${this.endpointURL}/${TemplateService.BASE_TEMPLATES_ENDPOINT}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': this.apiKey,
            ...headers,
          },
          body: JSON.stringify(requestBody),
        },
      );
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
      const result: TemplateCreateResponseDTO = await response.json();
      return TemplateServiceMapper.mapTemplateCreateResponseJsonToTemplateDTO(
        result,
      );
    } catch (error: any) {
      throw new Error(`Failed to create email template: ${error.message}`);
    }
  }

  async deleteTemplate({ id, headers }: IDeleteTemplate): Promise<void> {
    try {
      const response = await fetch(
        `${this.endpointURL}/${TemplateService.BASE_TEMPLATES_ENDPOINT}/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': this.apiKey,
            ...headers,
          },
        },
      );
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
      return;
    } catch (error: any) {
      throw new Error(`Failed to remove email template: ${error.message}`);
    }
  }
}