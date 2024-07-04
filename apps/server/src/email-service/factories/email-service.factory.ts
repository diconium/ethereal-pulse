import { ConfigService } from '@nestjs/config';
import { Injectable, Inject } from '@nestjs/common';
import { AwsEmailProvider } from '../providers/aws-email.provider';
import { AzureEmailProvider } from '../providers/azure-email.provider';
import { IEmailProvider } from '../interfaces/email-service.interface';
import { EMAIL_PROVIDERS } from '../constants/email-providers.constants';
import { EtherealEmailProvider } from '../providers/ethereal-email.provider';
import { CloudProviderType } from 'src/email-service/interfaces/cloud-provider.interface';
@Injectable()
export class EmailProviderFactory {
  constructor(
    @Inject(ConfigService) private readonly _configService: ConfigService,
  ) {}

  createEmailProvider(): IEmailProvider {
    const providerName = this._configService
      .get<string>('providers.common.cloudProviderName')
      ?.toLocaleLowerCase();

    if (!providerName) {
      throw new Error('Email provider not set');
    }

    const emailProvider = this.getEmailProviderInstance(
      providerName as CloudProviderType,
    );

    this.configureEmailProvider(emailProvider);
    return emailProvider;
  }

  private getEmailProviderInstance(type: CloudProviderType): IEmailProvider {
    switch (type) {
      case EMAIL_PROVIDERS.AZURE:
        return new AzureEmailProvider(this._configService);
      case EMAIL_PROVIDERS.AWS:
        return new AwsEmailProvider(this._configService);
      case EMAIL_PROVIDERS.ETHEREAL:
        return new EtherealEmailProvider(this._configService);
      default:
        throw new Error('Unsupported email provider');
    }
  }

  private configureEmailProvider(emailProvider: IEmailProvider): void {
    if (
      emailProvider instanceof AzureEmailProvider ||
      emailProvider instanceof AwsEmailProvider
    ) {
      emailProvider.configure();
    }
  }
}
