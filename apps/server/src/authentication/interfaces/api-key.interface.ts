import { ApiKeyPermission } from 'src/common/enums/api-key-permission.enum';

export interface IApiKey {
  name: string;
  token: string;
  userId: string;
  createdAt: Date;
  domainId?: string;
  permission: ApiKeyPermission;
}
