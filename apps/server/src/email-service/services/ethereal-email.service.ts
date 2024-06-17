import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { SendEmailDto } from '../dto/send-email.dto';
import { IEmailService } from '../interfaces/email-service.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EtherealEmailService implements IEmailService {
  constructor(private readonly configService: ConfigService) {}

  async sendEmail(sendEmailDto: SendEmailDto): Promise<any> {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: this.configService.get<string>('ethereal.username'),
        pass: this.configService.get<string>('ethereal.password'),
      },
    });

    const info = await transporter.sendMail({
      from: sendEmailDto.from,
      to: sendEmailDto.recipients.join(','),
      subject: sendEmailDto.subject,
      html: sendEmailDto.html,
    });

    return nodemailer.getTestMessageUrl(info);
  }
}
