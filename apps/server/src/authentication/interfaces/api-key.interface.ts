import { ICloudProvider } from 'src/email-service/interfaces/cloud-provider.interface';
import { API_KEY_PERMISSION_KEYS } from 'src/authentication/constants/api-key-permissions.contant';

export type ApiKeyPermission =
  | typeof API_KEY_PERMISSION_KEYS.FULL_ACCESS
  | typeof API_KEY_PERMISSION_KEYS.SENDING_ACCESS;

export interface IApiKey {
  name: string;
  createdAt: Date;
  provider: ICloudProvider;
  permission: ApiKeyPermission;
  domainId?: string;
  token: string;
  userId: string;
}
