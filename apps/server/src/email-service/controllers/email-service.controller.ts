import { EmailService } from '../services/email.service';
import { SendEmailRequestDto } from '../dto/send-email.dto';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { Controller, Post, Body, Headers, UseGuards } from '@nestjs/common';
import { AUTH_HEADERS } from 'src/authentication/constants/api-key-permissions.constant';

@Controller('email')
@UseGuards(ApiKeyGuard)
export class EmailController {
  constructor(private readonly _emailService: EmailService) {}

  @Post('send')
  async sendEmail(
    @Body() payload: SendEmailRequestDto,
    @Headers(AUTH_HEADERS.API_KEY) apiKey: string,
  ): Promise<void> {
    return this._emailService.processEmail(payload, apiKey);
  }
}
