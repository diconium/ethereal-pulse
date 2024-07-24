import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { mongo } from 'mongoose';

@Catch(mongo.MongoServerError)
export class MongoDuplicateKeyErrorFilter implements ExceptionFilter {
  catch(exception: mongo.MongoServerError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.BAD_REQUEST;

    let message: string;

    if (exception.code === 11000) {
      message = `Invalid duplicate values for: ${Object.keys(exception.keyValue)
        .map((key) => `{ ${key} : ${exception.keyValue[key]} }`)
        .join(', ')}`;
    } else {
      message =
        exception.errmsg || exception.message || 'An unknown error occurred';
    }

    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}
