import {
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ApiKeyGuard } from '../../../src/common/guards/api-key.guard';
import { ApiKeyRepository } from '../../../src/api-key/repositories/api-key.repository';
import { IApiKey } from '../../../src/authentication/interfaces/api-key.interface';
import { ApiKeyPermission } from '../../../src/common/enums/api-key-permission.enum';

describe('ApiKeyGuard', () => {
  let apiKeyGuard: ApiKeyGuard;
  let reflector: Reflector;
  let apiKeyRepository: ApiKeyRepository;
  const findOneSpy = jest.fn();
  beforeEach(() => {
    reflector = {
      get: jest.fn(),
    } as any;
    apiKeyRepository = {
      findOne: findOneSpy,
    } as any;
    apiKeyGuard = new ApiKeyGuard(reflector, apiKeyRepository);
  });

  describe('canActivate', () => {
    let context: ExecutionContext;
    const spySwitchToHttp = jest.fn();
    beforeEach(() => {
      context = {
        getHandler: jest.fn(),
        switchToHttp: spySwitchToHttp,
      } as any;
    });

    it('should throw an UnauthorizedException if apiKey is not provided', async () => {
      spySwitchToHttp.mockImplementation(() => ({
        getRequest: jest.fn().mockReturnValue({
          headers: {},
        }),
      }));
      await expect(apiKeyGuard.canActivate(context)).rejects.toThrow(
        new UnauthorizedException('API key is required'),
      );
    });

    it('should throw an UnauthorizedException if apiKey is invalid', async () => {
      const apiKey = 'invalid-api-key';
      spySwitchToHttp.mockImplementation(() => ({
        getRequest: jest.fn().mockReturnValue({
          headers: { 'x-api-key': apiKey },
        }),
      }));

      await expect(apiKeyGuard.canActivate(context)).rejects.toThrow(
        new UnauthorizedException('Invalid API key'),
      );
    });

    it('should throw a ForbiddenException if apiKey does not have the required permission', async () => {
      const apiKey = 'valid-api-key';
      const requiredPermission = 'admin';
      jest.spyOn(reflector, 'get').mockReturnValue(requiredPermission);

      spySwitchToHttp.mockImplementation(() => ({
        getRequest: jest.fn().mockReturnValue({
          headers: { 'x-api-key': apiKey },
        }),
      }));

      findOneSpy.mockResolvedValue(true);
      await expect(apiKeyGuard.canActivate(context)).rejects.toThrow(
        new ForbiddenException('Insufficient permissions'),
      );
    });

    it('should return true if apiKey is valid and has the required permission', async () => {
      const apiKey = 'valid-api-key';
      const requiredPermission = ApiKeyPermission.FULL_ACCESS;
      jest.spyOn(reflector, 'get').mockReturnValue(requiredPermission);

      spySwitchToHttp.mockImplementation(() => ({
        getRequest: jest.fn().mockReturnValue({
          headers: { 'x-api-key': apiKey },
        }),
      }));

      const apiKeyDocument: IApiKey = {
        name: 'name',
        token: 'token',
        userId: 'userId',
        createdAt: new Date(),
        permission: ApiKeyPermission.FULL_ACCESS,
      };
      findOneSpy.mockResolvedValue(apiKeyDocument);

      const result = await apiKeyGuard.canActivate(context);

      expect(result).toBe(true);
    });
  });
});
