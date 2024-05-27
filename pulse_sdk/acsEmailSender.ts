import { EmailClient, EmailMessage } from '@azure/communication-email';
import EmailSender, {EmailParams} from './emailSender'; // Importing EmailParams from emailSender

class AcsEmailSender extends EmailSender {
    private emailClient: EmailClient;

    constructor(connectionString: string) {
        super();
        this.emailClient = new EmailClient(connectionString);
    }

    async sendEmail(emailParams: EmailParams): Promise<any> { // Using EmailParams from EmailSender
        const { senderAddress, recipientAddress, subject, content } = emailParams;

        try {
            // Construct EmailMessage object
            const emailMessage: EmailMessage = {
                from: senderAddress,
                to: recipientAddress,
                subject: subject,
                body: content,
            };

            // Begin sending email
            const poller = await this.emailClient.beginSend(emailMessage);

            // Wait for sending process to complete
            const result = await poller.pollUntilDone();

            // Extract message ID from result
            const messageId = result._response.parsedBody.messageId; // Assuming messageId is accessible this way

            return { messageId: messageId };
        } catch (error) {
            throw new Error(`Error sending email with ACS: ${error.message}`);
        }
    }
}

export default AcsEmailSender;
