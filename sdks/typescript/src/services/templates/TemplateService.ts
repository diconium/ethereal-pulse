import { ITemplateService } from './ITemplatelService';
import { TemplateServiceMapper } from './TemplateServiceMapper';
import {
  ICreateTemplate,
  IUpdateTemplate,
  TemplateCreateResponseDTO,
  TemplateDTO,
  TemplateResponseDTO,
  TemplateUpdateResponseDTO,
} from './templateTypes';

export class TemplateService implements ITemplateService {
  private apiKey: string;
  private endpointURL: string;
  private static readonly BASE_TEMPLATES_ENDPOINT = 'templates';
  constructor(apiKey: string, endpointURL: string) {
    if (!apiKey || (apiKey && apiKey.trim() === '')) {
      throw new Error('Failed to provide a valid apiKey!!!!!');
    }

    this.apiKey = apiKey;
    this.endpointURL = endpointURL;
  }

  async getTemplates(
    headersOptions?: Record<string, any>,
  ): Promise<Array<TemplateDTO>> {
    try {
      const response = await fetch(
        `${this.endpointURL}/${TemplateService.BASE_TEMPLATES_ENDPOINT}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': this.apiKey,
            ...headersOptions,
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

  async createTemplate(
    { name, subject, html }: ICreateTemplate,
    headersOptions?: Record<string, any>,
  ): Promise<TemplateDTO> {
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
            ...headersOptions,
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

  async deleteTemplate(
    id: string,
    headersOptions?: Record<string, any>,
  ): Promise<void> {
    try {
      const response = await fetch(
        `${this.endpointURL}/${TemplateService.BASE_TEMPLATES_ENDPOINT}/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': this.apiKey,
            ...headersOptions,
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

  async updateTemplate(
    id: string,
    request: IUpdateTemplate,
    headersOptions?: Record<string, any>,
  ): Promise<TemplateDTO> {
    try {
      const response = await fetch(
        `${this.endpointURL}/${TemplateService.BASE_TEMPLATES_ENDPOINT}/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': this.apiKey,
            ...headersOptions,
          },
          body: JSON.stringify(request),
        },
      );
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
      const result: TemplateUpdateResponseDTO = await response.json();
      return TemplateServiceMapper.mapTemplateCreateResponseJsonToTemplateDTO(
        result,
      );
    } catch (error: any) {
      throw new Error(
        `Failed to update email template with id '${id}': ${error.message}`,
      );
    }
  }
}
