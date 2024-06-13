export interface EmailServiceInterface {
  sendEmail(
    recipients: string[],
    subject: string,
    htmlContent: string,
  ): Promise<void>;
}
