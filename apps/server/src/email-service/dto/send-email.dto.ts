import { IsString, IsArray, IsEmail, IsOptional } from 'class-validator';

export class SendEmailDto {
  @IsEmail()
  from: string;

  @IsArray()
  @IsEmail({}, { each: true })
  recipients: string[];

  @IsString()
  subject: string;

  @IsString()
  html: string;

  @IsOptional()
  @IsArray()
  bcc?: string[];

  @IsOptional()
  @IsArray()
  ccc?: string[];

  @IsOptional()
  headers?: object;

  @IsOptional()
  attachments?: object[];
}
