import { ApiKeyPermission } from 'src/authentication/interfaces/api-key.interface';

export class PostApiKeyRequestDto {
  name: string;
  permission: ApiKeyPermission;
}

export class CreateApiKeyDto {
  token: string;
  name: string;
  permission: ApiKeyPermission;
  userId: string;
}
