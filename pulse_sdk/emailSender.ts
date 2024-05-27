export interface EmailParams {
    senderAddress: string;
    recipientAddress: string;
    subject: string;
    content: string;
}

abstract class EmailSender {
    abstract sendEmail(emailParams: EmailParams): Promise<any>;
}

export default EmailSender;
