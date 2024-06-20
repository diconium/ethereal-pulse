import { EmailService } from '../services/email.service';
import { SendEmailRequestDto } from '../dto/send-email.dto';
import { Controller, Post, Body, Headers } from '@nestjs/common';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail(
    @Body() payload: SendEmailRequestDto,
    @Headers('x-api-key') apiKey: string,
  ): Promise<void> {
    return this.emailService.sendEmail(payload, apiKey);
  }
}
