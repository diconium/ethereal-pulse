import { ApiKeyPermission } from 'src/authentication/interfaces/api-key.interface';

export class PostApiKeyRequestDto {
  name: string;
  permission: ApiKeyPermission;
}

export class GetApiKeyRequestDto {
  id?: string;
  name: string;
  created_at: Date;
}

export class CreateApiKeyDto {
  token: string;
  name: string;
  permission: ApiKeyPermission;
  userId: string;
}
