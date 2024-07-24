import { ITemplateService } from './ITemplatelService';
import { TemplateServiceMapper } from './TemplateServiceMapper';
import {
  IGetTemplatesRequest,
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
}
