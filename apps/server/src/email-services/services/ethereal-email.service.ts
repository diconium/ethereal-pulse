import { Injectable } from '@nestjs/common';
import { SendEmailDto } from '../dto/send-email.dto';
import { EmailServiceInterface } from '../interfaces/email-service.interface';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EtherealEmailService implements EmailServiceInterface {
  async sendEmail(sendEmailDto: SendEmailDto): Promise<any> {
    let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: process.env.ETHEREAL_USERNAME,
        pass: process.env.ETHEREAL_PASSWORD,
      },
    });

    let info = await transporter.sendMail({
      from: sendEmailDto.from,
      to: sendEmailDto.recipients.join(','),
      subject: sendEmailDto.subject,
      html: sendEmailDto.html,
    });

    return nodemailer.getTestMessageUrl(info);
  }
}
