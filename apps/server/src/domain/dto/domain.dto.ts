import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

export class IdParamDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class PostDomainRequestDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  region: string;
}

export class PutDomainRequestDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  region?: string;
}

export class CreateDomainDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  region: string;

  @IsNotEmpty()
  apiKey: Types.ObjectId;
}
