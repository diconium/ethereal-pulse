import { Test, TestingModule } from '@nestjs/testing';
import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { HttpExceptionFilter } from '../../../src/common/filters/http-exception.filter';

describe('HttpExceptionFilter', () => {
  let filter: HttpExceptionFilter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpExceptionFilter],
    }).compile();

    filter = module.get<HttpExceptionFilter>(HttpExceptionFilter);
  });

  it('should catch and handle HttpException', () => {
    const mockStatus = HttpStatus.BAD_REQUEST;
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockRequest = {} as Request;
    const mockArgumentsHost = {
      switchToHttp: jest.fn().mockReturnThis(),
      getResponse: jest.fn().mockReturnValue(mockResponse),
      getRequest: jest.fn().mockReturnValue(mockRequest),
    };
    const mockException = new HttpException('Test exception', mockStatus);

    filter.catch(mockException, mockArgumentsHost as unknown as ArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(mockStatus);
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: mockStatus,
      timestamp: expect.any(String),
      path: mockRequest.url,
    });
  });
});
