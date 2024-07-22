import { IsString, IsArray } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  name: string;

  @IsArray()
  recipients: string[];
}

export class UpdateGroupDto {
  @IsString()
  name: string;

  @IsArray()
  recipients: string[];
}
