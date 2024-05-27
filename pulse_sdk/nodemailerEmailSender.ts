import nodemailer, { SendMailOptions, Transporter } from 'nodemailer';
import EmailSender from './emailSender';

class NodemailerEmailSender extends EmailSender {
    private transporter: Transporter;

    constructor(private smtpConfig: nodemailer.SentMessageInfo) {
        super();
        this.transporter = nodemailer.createTransport(smtpConfig);
    }

    async sendEmail(emailParams: EmailParams): Promise<any> {
        // Implementation for sending email with Nodemailer
    }
}

export default NodemailerEmailSender;
