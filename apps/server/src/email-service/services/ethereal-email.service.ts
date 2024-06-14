import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { SendEmailDto } from '../dto/send-email.dto';
import { IEmailService } from '../interfaces/email-service.interface';

@Injectable()
export class EtherealEmailService implements IEmailService {
  async sendEmail(sendEmailDto: SendEmailDto): Promise<any> {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: process.env.ETHEREAL_USERNAME,
        pass: process.env.ETHEREAL_PASSWORD,
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
