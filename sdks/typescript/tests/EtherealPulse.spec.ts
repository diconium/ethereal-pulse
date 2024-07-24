import {
  EtherealPulse,
  ISendEmailRequest,
  TemplateDTO,
} from '../src';
import { DEFAULT_ETH_PULSE_ENDPOINT } from '../src/constants/common.constants';
import { EmailService, TemplateService } from '../src/services';

global.fetch = jest.fn();

describe('EtherealPulse', () => {
  const apiKey = 'test-api-key';
  const dummyApiEndpoint = 'http://dummy-api-endpoint.com';

  beforeEach(() => {
    jest.resetAllMocks();
    process.env['ETH_PULSE_ENDPOINT'] = dummyApiEndpoint;
  });

  it('should send and email with success', async () => {
    const etherealPulse = new EtherealPulse(apiKey);
    const emailRequest: ISendEmailRequest = {
      from: 'sender@example.com',
      recipients: ['recipient@example.com'],
      subject: 'Test Subject',
      html: '<p>Test HTML</p>',
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ data: 'Email sent successfully' }),
    });

    const response = await etherealPulse.sendEmail(emailRequest);
    expect(response).toEqual({ data: 'Email sent successfully' });
    expect(global.fetch).toHaveBeenCalledTimes(1);

    expect(global.fetch).toHaveBeenCalledWith(
      dummyApiEndpoint + '/email/send',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'test-api-key',
        },
        body: '{"from":"sender@example.com","recipients":["recipient@example.com"],"subject":"Test Subject","html":"<p>Test HTML</p>"}',
      },
    );
  });

  it('when environment variable for the API endpoint is not defined should use the default variable with to send the email', async () => {
    delete process.env['ETH_PULSE_ENDPOINT'];
    const etherealPulse = new EtherealPulse(apiKey);
    const emailRequest: ISendEmailRequest = {
      from: 'sender@example.com',
      recipients: ['recipient@example.com'],
      subject: 'Test Subject',
      html: '<p>Test HTML</p>',
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ data: 'Email sent successfully' }),
    });

    const response = await etherealPulse.sendEmail(emailRequest);
    expect(response).toEqual({ data: 'Email sent successfully' });
    expect(global.fetch).toHaveBeenCalledTimes(1);

    expect(global.fetch).toHaveBeenCalledWith(
      DEFAULT_ETH_PULSE_ENDPOINT + '/email/send',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'test-api-key',
        },
        body: '{"from":"sender@example.com","recipients":["recipient@example.com"],"subject":"Test Subject","html":"<p>Test HTML</p>"}',
      },
    );
  });

  it('should throw an error when the sendEmail return with an error from the api', async () => {
    const etherealPulse = new EtherealPulse(apiKey);
    const emailRequest: ISendEmailRequest = {
      from: 'sender@example.com',
      recipients: ['recipient@example.com'],
      subject: 'Test Subject',
      html: '<p>Test HTML</p>',
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      text: async () => 'Email not sent successfully',
    });

    await expect(etherealPulse.sendEmail(emailRequest)).rejects.toThrow(
      'Failed to send email: Email not sent successfully',
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('should throw an error when apikey is invalid', async () => {
    expect(() => {
      new EtherealPulse('');
    }).toThrow('Failed to provide a valid apiKey!!!!!');
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
  });

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

    const templates: Array<TemplateDTO> =
      await etherealPulse.getTemplates();

    expect(templates).toEqual(responseServiceCall);
    expect(TemplateService.prototype.getTemplates).toHaveBeenCalledTimes(1);
  });
});
