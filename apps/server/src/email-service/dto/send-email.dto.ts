import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsArray,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IEmail } from '../interfaces/email.interface';
import { AzureEmailStatus } from '../interfaces/azure.interface';

export class SendEmailRequestDto implements IEmail {
  @IsEmail()
  from: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  recipients: string[];

  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsArray()
  @IsOptional()
  @Type(() => String)
  bcc?: string[];

  @IsArray()
  @IsOptional()
  @Type(() => String)
  cc?: string[];

  @IsArray()
  @IsOptional()
  @Type(() => Object)
  attachments?: object[];

  @IsNotEmpty()
  @IsString()
  html: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  status: AzureEmailStatus;

  @IsNotEmpty()
  @IsString()
  deliveryID: string;
}
