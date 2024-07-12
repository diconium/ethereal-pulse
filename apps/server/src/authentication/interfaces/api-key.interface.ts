import { API_KEY_PERMISSION_KEYS } from '../constants/api-key-permissions.constant';

export type ApiKeyPermission =
  | typeof API_KEY_PERMISSION_KEYS.FULL_ACCESS
  | typeof API_KEY_PERMISSION_KEYS.SENDING_ACCESS;

export interface IApiKey {
  name: string;
  token: string;
  userId: string;
  createdAt: Date;
  domainId?: string;
  permission: ApiKeyPermission;
}
