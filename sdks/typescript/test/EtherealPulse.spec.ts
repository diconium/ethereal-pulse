import {
  EtherealPulse,
  ICreateTemplateRequest,
  IDeleteTemplateRequest,
  IEtherealPulse,
  ISendEmailRequest,
  IUpdateTemplateRequest,
  TemplateDTO,
} from '../src';
import { DEFAULT_ETH_PULSE_ENDPOINT } from '../src/constants/common.constants';
import { EmailService, TemplateService } from '../src/services';

global.fetch = jest.fn();

describe('EtherealPulse', () => {
  const apiKey = 'test-api-key';
  const dummyApiEndpoint = 'http://dummy-api-endpoint.com';
  const invalidApiKey = '';

  beforeEach(() => {
    jest.resetAllMocks();
    process.env['ETH_PULSE_ENDPOINT'] = dummyApiEndpoint;
  });

  it('should throw an error if apiKey is invalid', () => {
    expect(() => new EtherealPulse(invalidApiKey)).toThrow(
      'Failed to provide a valid apiKey!!!!!',
    );
  });

  it('should initialize with a valid apiKey', () => {
    const etherealPulse: IEtherealPulse = new EtherealPulse(apiKey);

    // Check if the private fields are set correctly by testing the behavior
    expect((etherealPulse as any).apiKey).toBe(apiKey);
    expect((etherealPulse as any).endpointURL).toBe(dummyApiEndpoint);
    expect((etherealPulse as any).emailsService).toBeInstanceOf(EmailService);
    expect((etherealPulse as any).templatesService).toBeInstanceOf(
      TemplateService,
    );
  });

  it('should initialize with a valid apiKey, when the ETH_PULSE_ENDPOINT environment variable is not defined should use the DEFAULT_ETH_PULSE_ENDPOINT', () => {
    delete process.env['ETH_PULSE_ENDPOINT'];
    const etherealPulse = new EtherealPulse(apiKey);

    // Check if the private fields are set correctly by testing the behavior
    expect((etherealPulse as any).apiKey).toBe(apiKey);
    expect((etherealPulse as any).endpointURL).toBe(DEFAULT_ETH_PULSE_ENDPOINT);
    expect((etherealPulse as any).emailsService).toBeInstanceOf(EmailService);
    expect((etherealPulse as any).templatesService).toBeInstanceOf(
      TemplateService,
    );
  });

  describe('sendEmail', () => {
    it('should send and email with success', async () => {
      delete process.env['ETH_PULSE_ENDPOINT'];
      const etherealPulse = new EtherealPulse(apiKey);
      const emailRequest: ISendEmailRequest = {
        from: 'sender@example.com',
        recipients: ['recipient@example.com'],
        subject: 'Test Subject',
        html: '<p>Test HTML</p>',
      };

      jest.spyOn(EmailService.prototype, 'sendEmail').mockResolvedValue({});

      await etherealPulse.sendEmail(emailRequest);
      expect(EmailService.prototype.sendEmail).toHaveBeenCalledTimes(1);
      expect(EmailService.prototype.sendEmail).toHaveBeenCalledWith({
        from: 'sender@example.com',
        recipients: ['recipient@example.com'],
        subject: 'Test Subject',
        html: '<p>Test HTML</p>',
      });
    });

    it('should send and email with success when bcc, cc and attachments defined', async () => {
      const etherealPulse = new EtherealPulse(apiKey);
      const emailRequest: ISendEmailRequest = {
        from: 'sender@example.com',
        recipients: ['recipient@example.com'],
        subject: 'Test Subject',
        html: '<p>Test HTML</p>',
        bcc: ['bcc1@example.com'],
        cc: ['cc1@example.com'],
        attachments: [],
      };

      jest
        .spyOn(EmailService.prototype, 'sendEmail')
        .mockResolvedValue({ data: 'Email sent successfully' });

      const response = await etherealPulse.sendEmail(emailRequest);
      expect(response).toEqual({ data: 'Email sent successfully' });
      expect(EmailService.prototype.sendEmail).toHaveBeenCalledTimes(1);
      expect(EmailService.prototype.sendEmail).toHaveBeenCalledWith({
        from: 'sender@example.com',
        recipients: ['recipient@example.com'],
        subject: 'Test Subject',
        html: '<p>Test HTML</p>',
        bcc: ['bcc1@example.com'],
        cc: ['cc1@example.com'],
        attachments: [],
      });
    });
  });
  describe('getTemplates', () => {
    it('should fetch email templates with success', async () => {
      const etherealPulse = new EtherealPulse(apiKey);
      const responseServiceCall: Array<TemplateDTO> = [
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

      jest
        .spyOn(TemplateService.prototype, 'getTemplates')
        .mockResolvedValue(responseServiceCall);

      const templates: Array<TemplateDTO> = await etherealPulse.getTemplates();

      expect(templates).toEqual(responseServiceCall);
      expect(TemplateService.prototype.getTemplates).toHaveBeenCalledTimes(1);
    });
  });

  describe('createTemplate', () => {
    it('should create email template with success', async () => {
      const etherealPulse = new EtherealPulse(apiKey);
      const responseServiceCall: TemplateDTO = {
        id: '1',
        name: 'Airbnb review',
        subject: 'Airbnb review',
        html: '<h1>TEST review</h1>',
        userId: '11',
      };

      jest
        .spyOn(TemplateService.prototype, 'createTemplate')
        .mockResolvedValue(responseServiceCall);

      const request: ICreateTemplateRequest = {
        subject: 'Test Subject',
        html: '<p>Test HTML</p>',
        name: 'new template',
      };
      const template: TemplateDTO = await etherealPulse.createTemplate(request);

      expect(template).toEqual(responseServiceCall);
      expect(TemplateService.prototype.createTemplate).toHaveBeenCalledTimes(1);
      expect(TemplateService.prototype.createTemplate).toHaveBeenCalledWith({
        subject: 'Test Subject',
        html: '<p>Test HTML</p>',
        name: 'new template',
        headers: undefined,
      });
    });
  });

  describe('deleteTemplate', () => {
    it('should delete email template with success', async () => {
      const etherealPulse = new EtherealPulse(apiKey);
      jest
        .spyOn(TemplateService.prototype, 'deleteTemplate')
        .mockResolvedValue();

      const request: IDeleteTemplateRequest = {
        id: 'templateId',
      };
      await etherealPulse.deleteTemplate(request);
      expect(TemplateService.prototype.deleteTemplate).toHaveBeenCalledTimes(1);
      expect(TemplateService.prototype.deleteTemplate).toHaveBeenCalledWith({
        headers: undefined,
        id: request.id,
      });
    });
  });

  describe('updateTemplate', () => {
    it('should update email template with success', async () => {
      const etherealPulse = new EtherealPulse(apiKey);
      const responseServiceCall: TemplateDTO = {
        id: '1',
        name: 'Airbnb review',
        subject: 'Airbnb review',
        html: '<h1>TEST review</h1>',
        userId: '11',
      };

      jest
        .spyOn(TemplateService.prototype, 'updateTemplate')
        .mockResolvedValue(responseServiceCall);

      const request: IUpdateTemplateRequest = {
        subject: 'Test Subject',
        html: '<p>Test HTML</p>',
        name: 'new template',
      };
      const dummyTemplateId = 'templateId';
      const template: TemplateDTO = await etherealPulse.updateTemplate(
        dummyTemplateId,
        request,
      );

      expect(template).toEqual(responseServiceCall);
      expect(TemplateService.prototype.updateTemplate).toHaveBeenCalledTimes(1);
      expect(TemplateService.prototype.updateTemplate).toHaveBeenCalledWith(
        dummyTemplateId,
        {
          subject: 'Test Subject',
          html: '<p>Test HTML</p>',
          name: 'new template',
        },
        undefined,
      );
    });
  });
});
