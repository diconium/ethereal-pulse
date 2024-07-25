import {
  ICreateTemplate,
  IDeleteTemplate,
  IGetTemplatesRequest,
  IUpdateTemplate,
  TemplateCreateResponseDTO,
  TemplateDTO,
  TemplateResponseDTO,
  TemplateService,
  TemplateUpdateResponseDTO,
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

  describe('getTemplates', () => {
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
  describe('createTemplate', () => {
    it('should create a templates successfully', async () => {
      const request: ICreateTemplate = {
        subject: 'Test Subject',
        html: '<p>Test HTML</p>',
        name: 'new template',
      };

      const serviceResponse: TemplateCreateResponseDTO = {
        name: 'new template',
        subject: 'Test Subject',
        html: '<>Test HTML</ p > ',
        _id: '66a1166189bbed9bf9974e68',
        __v: 0,
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => serviceResponse,
      });

      const templates = await templateService.createTemplate(request);

      const expectedOutput: TemplateDTO = {
        id: '66a1166189bbed9bf9974e68',
        name: 'new template',
        subject: 'Test Subject',
        html: '<>Test HTML</ p > ',
      };
      expect(templates).toEqual(expectedOutput);
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should throw an error when create endpoint response is an error', async () => {
      const request: ICreateTemplate = {
        subject: 'Test Subject',
        html: '<p>Test HTML</p>',
        name: 'new template',
      };
      const errorMessage = 'Templates not created successfully';

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        text: async () => errorMessage,
      });

      await expect(templateService.createTemplate(request)).rejects.toThrow(
        `Failed to create email template: ${errorMessage}`,
      );
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteTemplate', () => {
    it('should delete a templates successfully', async () => {
      const request: IDeleteTemplate = {
        id: 'templateId',
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
      });

      await templateService.deleteTemplate(request);
      expect(global.fetch).toHaveBeenCalledTimes(1);

      expect(global.fetch).toHaveBeenCalledWith(
        `https://api.example.com/templates/${request.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'API_KEY',
          },
        },
      );
    });

    it('should throw an error when delete template endpoint response is an error', async () => {
      const request: IDeleteTemplate = {
        id: 'templateId',
      };
      const errorMessage = 'Templates not deleted successfully';

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        text: async () => errorMessage,
      });

      await expect(templateService.deleteTemplate(request)).rejects.toThrow(
        `Failed to remove email template: ${errorMessage}`,
      );
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateTemplate', () => {
    it('should update a templates successfully', async () => {
      const request: IUpdateTemplate = {
        subject: 'Test Subject',
        html: '<p>Test HTML</p>',
        name: 'new template',
      };

      const serviceResponse: TemplateUpdateResponseDTO = {
        name: 'new template',
        subject: 'Test Subject',
        html: '<>Test HTML</ p > ',
        _id: '66a1166189bbed9bf9974e68',
        __v: 0,
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => serviceResponse,
      });

      const templates = await templateService.updateTemplate(
        'templateId',
        request,
      );

      const expectedOutput: TemplateDTO = {
        id: '66a1166189bbed9bf9974e68',
        name: 'new template',
        subject: 'Test Subject',
        html: '<>Test HTML</ p > ',
      };
      expect(templates).toEqual(expectedOutput);
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should throw an error when update endpoint response is an error', async () => {
      const request: IUpdateTemplate = {
        subject: 'Test Subject',
        html: '<p>Test HTML</p>',
        name: 'new template',
      };
      const errorMessage = 'Templates not updated successfully';

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        text: async () => errorMessage,
      });
      const dummyTemplateId = 'templateId';
      await expect(
        templateService.updateTemplate(dummyTemplateId, request),
      ).rejects.toThrow(
        `Failed to update email template with id '${dummyTemplateId}': ${errorMessage}`,
      );
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });
});
