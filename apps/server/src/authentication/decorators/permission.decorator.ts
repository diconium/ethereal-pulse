import { SetMetadata } from '@nestjs/common';

export const PERMISSION_KEY = 'permission';
export const Permission = (permission: 'full_access' | 'sending_access') =>
  SetMetadata(PERMISSION_KEY, permission); //  TODO: VERIFY IF permission TYPE COULD BE REPLACED BY 'API_KEY_PERMISSION_KEYS'INSTEAD
