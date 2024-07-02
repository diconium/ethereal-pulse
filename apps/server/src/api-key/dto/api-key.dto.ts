import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiKeyPermission } from 'src/common/enums/api-key-permission.enum';

export class IdParamDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class PostApiKeyRequestDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(ApiKeyPermission)
  @IsNotEmpty()
  permission: ApiKeyPermission;

  @IsString()
  domainId: string;
}

export class PostApiKeyResponseDto {
  @IsString()
  id?: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}

export class GetApiKeysResponseDto {
  @IsString()
  id?: string;

  @IsString()
  name: string;

  @IsDate()
  created_at: Date;
}

export class GetApiKeysWrapperResponseDto {
  data: GetApiKeysResponseDto[];
}

export class CreateApiKeyDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(ApiKeyPermission)
  @IsNotEmpty()
  permission: ApiKeyPermission;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
