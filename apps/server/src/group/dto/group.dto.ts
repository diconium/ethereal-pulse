import { IsString, IsArray, IsMongoId } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  name: string;

  @IsArray()
  recipients: string[];

  @IsMongoId()
  userId: string;
}

export class UpdateGroupDto {
  @IsString()
  name: string;

  @IsArray()
  recipients: string[];

  @IsMongoId()
  userId: string;
}
