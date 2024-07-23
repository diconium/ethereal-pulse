import { ISendEmailRequest } from '../src/interfaces/email-services.interface';
import { EtherealPulse } from '../src';

global.fetch = jest.fn();

describe('EtherealPulse', () => {
  const apiKey = 'test-api-key';
  const etherealPulse = new EtherealPulse(apiKey);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should send and email with success', async () => {
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
      'http://localhost:3000/email/send',
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
    try {
      new EtherealPulse('');
    } catch (error) {
      expect(error.message).toBe('Failed to provide a valid apiKey!!!!!');
    }
  });

  it('should send and email with success when bcc, cc and attachments defined', async () => {
    const emailRequest: ISendEmailRequest = {
      from: 'sender@example.com',
      recipients: ['recipient@example.com'],
      subject: 'Test Subject',
      html: '<p>Test HTML</p>',
      bcc: ['bcc1@example.com'],
      cc: ['cc1@example.com'],
      attachments: [],
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ data: 'Email sent successfully' }),
    });

    const response = await etherealPulse.sendEmail(emailRequest);
    expect(response).toEqual({ data: 'Email sent successfully' });
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
