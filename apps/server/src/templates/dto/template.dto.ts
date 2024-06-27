import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class IdParamDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class TemplateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  html: string;

  @IsString()
  @IsOptional()
  userId?: string;
}
