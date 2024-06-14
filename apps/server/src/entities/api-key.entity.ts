import { HydratedDocument } from 'mongoose';
import { ICloudProvider } from '../email-service/interfaces/cloud-provider.interface';
import { API_KEY_PERMISSION_KEYS } from 'src/authentication/constants/api-key-permissions.contant';

export type ApiKeyPermission =
  | typeof API_KEY_PERMISSION_KEYS.FULL_ACCESS
  | typeof API_KEY_PERMISSION_KEYS.SENDING_ACCESS;

export interface ApiKey {
  name: string;
  createdAt: Date;
  provider: ICloudProvider;
  permission: ApiKeyPermission;
}

export type ApiKeyDocument = HydratedDocument<ApiKey>;
