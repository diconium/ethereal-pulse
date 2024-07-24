import {
  IGetTemplatesRequest,
  TemplateDTO,
  TemplateResponseDTO,
  TemplateService,
} from '../../../src/services/templates';

global.fetch = jest.fn();

describe('TemplateService', () => {
  let templateService: TemplateService;

  beforeEach(() => {
    templateService = new TemplateService('API_KEY', 'https://api.example.com');
  });

  it('should throw error if apikey is not valid', async () => {
    expect(() => {
      new TemplateService('', '');
    }).toThrow('Failed to provide a valid apiKey!!!!!');
    expect(global.fetch).toHaveBeenCalledTimes(0);
  });

  it('should fetch templates successfully', async () => {
    const request: IGetTemplatesRequest = {};

    const serviceResponse: Array<TemplateResponseDTO> = [
      {
        _id: '1',
        name: 'Airbnb review',
        subject: 'Airbnb review',
        createdAt: '2025-01-01T00:00:00.000Z',
        html: '<h1>TEST review</h1>',
        userId: '11',
      },
      {
        _id: '2',
        name: 'Airbnb sales',
        subject: 'Airbnb sales',
        createdAt: '2025-01-01T00:00:00.000Z',
        html: '<h1>TEST sales</h1>',
        userId: '22',
      },
      {
        _id: '3',
        name: 'Airbnb special',
        subject: 'Airbnb special',
        createdAt: '2025-01-01T00:00:00.000Z',
        html: '<h1>TEST special</h1>',
        userId: '33',
      },
    ];

    const expectedOutput: Array<TemplateDTO> = [
      {
        id: '1',
        name: 'Airbnb review',
        subject: 'Airbnb review',
        html: '<h1>TEST review</h1>',
        userId: '11',
      },
      {
        id: '2',
        name: 'Airbnb sales',
        subject: 'Airbnb sales',
        html: '<h1>TEST sales</h1>',
        userId: '22',
      },
      {
        id: '3',
        name: 'Airbnb special',
        subject: 'Airbnb special',
        html: '<h1>TEST special</h1>',
        userId: '33',
      },
    ];

    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => serviceResponse,
    } as Response);

    const templates = await templateService.getTemplates(request);

    expect(templates).toEqual(expectedOutput);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('should throw an error when the fetch emails return with an error from the api', async () => {
    const request: IGetTemplatesRequest = {};
    const errorMessage = 'Templates not fetched successfully';
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      text: async () => errorMessage,
    } as Response);

    await expect(templateService.getTemplates(request)).rejects.toThrow(
      `Failed to fetch email templates: ${errorMessage}`,
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
