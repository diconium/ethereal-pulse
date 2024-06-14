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
  @IsEmail({}, { each: true })
  bcc?: string[];

  @IsOptional()
  @IsArray()
  @IsEmail({}, { each: true })
  cc?: string[];

  @IsOptional()
  headers?: Record<string, any>;

  @IsOptional()
  attachments?: Record<string, any>[];
}
