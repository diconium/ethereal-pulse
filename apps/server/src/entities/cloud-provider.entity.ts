import { EMAIL_PROVIDERS } from 'src/email-service/constants/email-providers.constants';

export type CloudProviderType =
  (typeof EMAIL_PROVIDERS)[keyof typeof EMAIL_PROVIDERS];

export interface ICloudProviderCredentials {
  accessKeyId?: string;
  secretAccessKey?: string;
  connectionString?: string;
}

export interface ICloudProvider {
  id: string;
  type: CloudProviderType;
  credentials: ICloudProviderCredentials;
}
