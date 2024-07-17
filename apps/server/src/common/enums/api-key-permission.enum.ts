import { API_KEY_PERMISSION_KEYS } from 'src/authentication/constants/api-key-permissions.constant';

export enum ApiKeyPermission {
  FULL_ACCESS = API_KEY_PERMISSION_KEYS.FULL_ACCESS,
  SENDING_ACCESS = API_KEY_PERMISSION_KEYS.SENDING_ACCESS,
  READ_ACCESS = API_KEY_PERMISSION_KEYS.READ_ACCESS,
}
