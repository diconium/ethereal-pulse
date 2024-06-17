import { ApiKeyDocument } from 'src/database/schemas/api-key.schema';
import { ApiKeyRepository } from '../../authentication/repositories/api-key.repository';
import { EmailServiceFactory } from '../factories/email-service.factory';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IEmailService } from '../interfaces/email-service.interface';
import { UserRepository } from 'src/user/repositories/user.repository';
import { SendEmailRequestDto } from '../dto/send-email.dto';

@Injectable()
export class EmailService implements IEmailService {
  private emailService: IEmailService;

  constructor(
    private readonly emailServiceFactory: EmailServiceFactory,
    private readonly userRepository: UserRepository,
    private readonly apiKeyRepository: ApiKeyRepository,
  ) {}

  async sendEmail(payload: SendEmailRequestDto, apiKey: string): Promise<any> {
    const apiKeyDoc = await this.getApiKeyDocument(apiKey);
    this.emailService = this.getEmailService(apiKeyDoc.provider);

    await this.emailService.sendEmail(payload, apiKey);
  }

  private async getApiKeyDocument(apiKey: string): Promise<ApiKeyDocument> {
    const apiKeyDoc = await this.apiKeyRepository.findOneWithProvider(apiKey);
    if (!apiKeyDoc) throw new UnauthorizedException('Invalid API key');
    return apiKeyDoc;
  }

  private getEmailService(provider: any): IEmailService {
    const emailService = this.emailServiceFactory.createEmailService(provider);
    if (!emailService) throw new Error('Email provider not set');
    return emailService;
  }
}
