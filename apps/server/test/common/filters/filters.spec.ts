import { Test, TestingModule } from '@nestjs/testing';
import { ArgumentsHost, HttpStatus } from '@nestjs/common';
import { mongo } from 'mongoose';
import { MongoDuplicateKeyErrorFilter } from '../../../src/common/filters/mongo-duplicate-key-error.filter';

describe('MongoErrorFilter', () => {
  let filter: MongoDuplicateKeyErrorFilter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongoDuplicateKeyErrorFilter],
    }).compile();

    filter = module.get<MongoDuplicateKeyErrorFilter>(
      MongoDuplicateKeyErrorFilter,
    );
  });

  it('should return 400 status and formatted message for duplicate key error', () => {
    const exception = new mongo.MongoServerError({
      code: 11000,
      keyValue: { username: 'testuser' },
    });

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockArgumentsHost = {
      switchToHttp: jest.fn().mockReturnThis(),
      getResponse: jest.fn().mockReturnValue(mockResponse),
    };

    filter.catch(exception, mockArgumentsHost as unknown as ArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Invalid duplicate values for: { username : testuser }',
    });
  });

  it('should return 400 status and default message for non-duplicate key errors', () => {
    const exception = new mongo.MongoServerError({
      errmsg: 'Some other error occurred',
    });

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockArgumentsHost = {
      switchToHttp: jest.fn().mockReturnThis(),
      getResponse: jest.fn().mockReturnValue(mockResponse),
    };

    filter.catch(exception, mockArgumentsHost as unknown as ArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Some other error occurred',
    });
  });
});
