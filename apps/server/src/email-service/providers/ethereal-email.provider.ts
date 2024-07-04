import * as nodemailer from 'nodemailer';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendEmailRequestDto } from '../dto/send-email.dto';
import { IEmailProvider } from '../interfaces/email-service.interface';

@Injectable()
export class EtherealEmailProvider implements IEmailProvider {
  constructor(
    @Inject(ConfigService) private readonly _configService: ConfigService,
  ) {}

  async sendEmail(SendEmailRequestDto: SendEmailRequestDto): Promise<any> {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: this._configService.get<string>('ethereal.username'),
        pass: this._configService.get<string>('ethereal.password'),
      },
    });

    const info = await transporter.sendMail({
      from: SendEmailRequestDto.from,
      to: SendEmailRequestDto.recipients.join(','),
      subject: SendEmailRequestDto.subject,
      html: SendEmailRequestDto.html,
    });

    return nodemailer.getTestMessageUrl(info);
  }
}
