import { EmailService } from '../services/email.service';
import { Controller, Post, Body, Headers } from '@nestjs/common';
import { ISendEmailPayload } from '../interfaces/email-service.interface';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail(
    @Body() payload: ISendEmailPayload,
    @Headers('x-api-key') apiKey: string,
  ): Promise<void> {
    return this.emailService.sendEmail(payload, apiKey);
  }
}
