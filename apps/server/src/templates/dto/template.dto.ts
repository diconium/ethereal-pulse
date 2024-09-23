import { IsString, IsNotEmpty } from 'class-validator';

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
}
