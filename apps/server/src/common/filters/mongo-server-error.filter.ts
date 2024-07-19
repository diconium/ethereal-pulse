import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { mongo } from 'mongoose';

@Catch(mongo.MongoServerError)
export class MongoErrorFilter implements ExceptionFilter {
  catch(exception: mongo.MongoServerError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.BAD_REQUEST;

    let message;

    if (exception.code === 11000) {
      message = `Invalid duplicate values for:${Object.keys(exception.keyValue).map((key) => ` {key} : ${exception.keyValue[key]}`)}`;
    } else {
      message = exception.errmsg ?? exception.errorResponse.errmsg;
    }
    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}
