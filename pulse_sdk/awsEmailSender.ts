import { SES } from 'aws-sdk';
import EmailSender from './emailSender';

class AWSEmailSender extends EmailSender {
    private ses: SES;

    constructor(private config: AWS.SES.Types.ClientConfiguration) {
        super();
        this.ses = new SES(config);
    }

    async sendEmail(emailParams: EmailParams): Promise<any> {
        // Implementation for sending email with AWS SES
    }
}

export default AWSEmailSender;
