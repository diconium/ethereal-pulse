import { Injectable } from '@nestjs/common';
import { SendEmailRequestDto } from '../dto/send-email.dto';
import {
  IEmailService,
  IEmailProvider,
} from '../interfaces/email-service.interface';
import { EmailProviderFactory } from '../factories/email-service.factory';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class EmailService implements IEmailService {
  private emailProvider: IEmailProvider;

  constructor(
    private readonly _emailProviderFactory: EmailProviderFactory,
    private readonly _userService: UserService,
  ) {}

  async processEmail(
    userId: string,
    apiKey: string,
    payload: SendEmailRequestDto,
  ): Promise<unknown> {
    this.emailProvider = this._emailProviderFactory.createEmailProvider();
    const response = await this.emailProvider.sendEmail(payload, apiKey);
    await this._userService.persistEmailWithResponse(userId, payload, response);
    return response;
  }
}
