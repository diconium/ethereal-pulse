import { Injectable } from '@nestjs/common';
import { SendEmailRequestDto } from '../dto/send-email.dto';
import {
  IEmailService,
  IEmailProvider,
} from '../interfaces/email-service.interface';
import { EmailProviderFactory } from '../factories/email-service.factory';

@Injectable()
export class EmailService implements IEmailService {
  private emailProvider: IEmailProvider;

  constructor(private readonly _emailProviderFactory: EmailProviderFactory) {}

  async processEmail(
    payload: SendEmailRequestDto,
    apiKey: string,
  ): Promise<any> {
    this.emailProvider = this._emailProviderFactory.createEmailProvider();
    return await this.emailProvider.sendEmail(payload, apiKey);
  }
}
