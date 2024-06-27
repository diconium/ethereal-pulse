import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { Error as MongooseError } from 'mongoose';

@Catch(MongooseError.ValidationError)
export class MongooseValidationFilter implements ExceptionFilter {
  catch(exception: MongooseError.ValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.BAD_REQUEST;

    const errors = Object.values(exception.errors).map((error: any) => ({
      field: error.path,
      message: error.message,
    }));

    response.status(status).json({
      statusCode: status,
      message: 'Validation failed',
      errors: errors,
    });
  }
}
