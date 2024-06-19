import { SendEmailRequestDto } from '../dto/send-email.dto';
import { ApiKeyDocument } from 'src/entities/api-key.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IEmailService } from '../interfaces/email-service.interface';
import { UserRepository } from 'src/user/repositories/user.repository';
import { EmailServiceFactory } from '../factories/email-service.factory';
import {
  ApiKeyRepository,
  IApiKeyDocumentWithProvider,
} from '../../authentication/repositories/api-key.repository';
import { ICloudProvider } from '../interfaces/cloud-provider.interface';

@Injectable()
export class EmailService implements IEmailService {
  private emailService: IEmailService;

  constructor(
    private readonly emailServiceFactory: EmailServiceFactory,
    private readonly userRepository: UserRepository,
    private readonly apiKeyRepository: ApiKeyRepository,
  ) {}

  async sendEmail(payload: SendEmailRequestDto, apiKey: string): Promise<any> {
    const apiKeyProviderDocument = await this.getApiKeyProvider(apiKey);
    if (!apiKeyProviderDocument) {
      throw new UnauthorizedException('Invalid API key');
    }
    const { provider } = apiKeyProviderDocument;
    this.emailService = this.getEmailService(provider);

    await this.emailService.sendEmail(payload, apiKey);
  }

  private async getApiKeyProvider(apiKey: string): Promise<{
    apiKeyDoc: IApiKeyDocumentWithProvider;
    provider: ICloudProvider;
  } | null> {
    const result = await this.apiKeyRepository.findOneWithProvider(apiKey);
    if (!result) throw new UnauthorizedException('Invalid API key');
    return result;
  }

  private getEmailService(provider: ICloudProvider): IEmailService {
    const emailService = this.emailServiceFactory.createEmailService(provider);
    if (!emailService) throw new Error('Email provider not set');
    return emailService;
  }
}
