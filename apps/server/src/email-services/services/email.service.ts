import { Injectable, Inject } from '@nestjs/common';
import { EmailServiceFactory } from '../factories/email-service.factory';
import { EmailServiceInterface } from '../interfaces/email-service.interface';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class EmailService implements EmailServiceInterface {
  private emailService: EmailServiceInterface;

  constructor(
    private readonly emailServiceFactory: EmailServiceFactory,
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async setEmailProvider(userId: string, providerType: string): Promise<void> {
    const user = await this.userRepository.findOne({ _id: userId });
    const provider = user.providers.find((p) => p.type === providerType);

    if (!provider) {
      throw new Error('Provider not found for user');
    }

    this.emailService = this.emailServiceFactory.createEmailService(provider);
  }

  async sendEmail(
    // TODO: update this arg to full match the dto for this endpoint
    recipients: string[],
    subject: string,
    htmlContent: string,
  ): Promise<void> {
    if (!this.emailService) {
      throw new Error('Email provider not set');
    }
    await this.emailService.sendEmail(recipients, subject, htmlContent);
  }
}
