import axios from 'axios';
import EtherealPulse from '../src/index';
import { ISendEmailRequest } from '../src/interfaces/email-services.interface';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('EtherealPulse', () => {
  const apiKey = 'test-api-key';
  const etherealPulse = new EtherealPulse(apiKey);

  it('should create a request body correctly', () => {
    const emailRequest: ISendEmailRequest = {
      from: 'sender@example.com',
      recipients: ['recipient@example.com'],
      subject: 'Test Subject',
      html: '<p>Test HTML</p>',
    };

    const requestBody = etherealPulse['createRequestBody'](emailRequest);
    expect(requestBody).toEqual(emailRequest);
  });

  it('should handle errors correctly', () => {
    const error = {
      response: {
        data: 'Error message from server',
      },
      message: 'Error message',
    } as any;

    expect(() => etherealPulse['handleError'](error)).toThrow(
      'Failed to send email: Error message from server',
    );
  });

  it('should send an email successfully', async () => {
    const emailRequest: ISendEmailRequest = {
      from: 'sender@example.com',
      recipients: ['recipient@example.com'],
      subject: 'Test Subject',
      html: '<p>Test HTML</p>',
    };

    mockedAxios.post.mockResolvedValue({ data: 'Email sent successfully' });

    const response = await etherealPulse.sendEmail(emailRequest);
    expect(response).toBe('Email sent successfully');
    expect(mockedAxios.post).toHaveBeenCalledWith(
      'https://api.yourdomain.com/v1/email/send',
      {
        from: 'sender@example.com',
        recipients: ['recipient@example.com'],
        subject: 'Test Subject',
        html: '<p>Test HTML</p>',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
      },
    );
  });

  it('should handle errors when sending an email', async () => {
    const emailRequest: ISendEmailRequest = {
      from: 'sender@example.com',
      recipients: ['recipient@example.com'],
      subject: 'Test Subject',
      html: '<p>Test HTML</p>',
    };

    const error = {
      response: {
        data: 'Error message from server',
      },
      message: 'Error message',
    } as any;

    mockedAxios.post.mockRejectedValue(error);

    await expect(etherealPulse.sendEmail(emailRequest)).rejects.toThrow(
      'Failed to send email: Error message from server',
    );
  });
});
