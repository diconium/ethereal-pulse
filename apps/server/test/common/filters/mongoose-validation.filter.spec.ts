import { Test, TestingModule } from '@nestjs/testing';
import { ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { MongooseValidationFilter } from '../../../src/common/filters/mongoose-validation.filter';
import { Error as MongooseError } from 'mongoose';

describe('MongooseValidationFilter', () => {
  let filter: MongooseValidationFilter;
  let mockResponse: Partial<Response>;
  let mockHost: unknown;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongooseValidationFilter],
    }).compile();

    filter = module.get<MongooseValidationFilter>(MongooseValidationFilter);
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockHost = {
      switchToHttp: jest.fn().mockReturnThis(),
      getResponse: jest.fn().mockReturnValue(mockResponse),
    };
  });

  it('should catch and handle MongooseError.ValidationError', () => {
    const mockException = new MongooseError.ValidationError();

    filter.catch(mockException, mockHost as ArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Validation failed',
      errors: [],
    });
  });

  it('should format and send validation errors in the response', () => {
    const mockException = new MongooseError.ValidationError();
    mockException.errors = {
      path: new MongooseError.ValidatorError({
        path: 'name',
        message: 'Name is required',
      }),
    };
    mockException.addError(
      'email',
      new MongooseError.ValidatorError({
        path: 'email',
        message: 'Email is invalid',
      }),
    );
    filter.catch(mockException, mockHost as ArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Validation failed',
      errors: [
        { field: 'name', message: 'Name is required' },
        { field: 'email', message: 'Email is invalid' },
      ],
    });
  });
});
