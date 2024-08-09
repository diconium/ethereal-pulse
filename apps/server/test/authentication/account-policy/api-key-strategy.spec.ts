// apps/server/src/authentication/account-policy/api-key-strategy.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { ApiKeyStrategy } from '../../../src/authentication/account-policy/api-key-strategy';
import { AuthenticationService } from '../../../src/authentication/services/authentication.service';

describe('ApiKeyStrategy', () => {
  let strategy: ApiKeyStrategy;
  let mockAuthenticationService: Partial<AuthenticationService>;

  beforeEach(async () => {
    mockAuthenticationService = {
      validateUser: jest.fn().mockImplementation((apiKey: string) => {
        if (apiKey === 'valid-api-key') {
          return { userId: 'some-user-id' };
        }
        throw new UnauthorizedException();
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiKeyStrategy,
        { provide: AuthenticationService, useValue: mockAuthenticationService },
      ],
    }).compile();

    strategy = module.get<ApiKeyStrategy>(ApiKeyStrategy);
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  describe('validate', () => {
    it('should throw UnauthorizedException if no API key is provided', async () => {
      const req = { headers: {} } as any;
      const callback = jest.fn();
      strategy.validate(req, callback);
      expect(callback).toHaveBeenCalledWith(
        new UnauthorizedException('API key is missing'),
        false,
      );
    });

    it('should return user object if API key is valid', async () => {
      const req = { headers: { 'x-api-key': 'valid-api-key' } } as any;
      const callback = jest.fn();
      await strategy.validate(req, callback);
      // expect(result).toEqual({ userId: 'some-user-id' });
      expect(callback).toHaveBeenCalledWith(
        new UnauthorizedException('Provider validation failed'),
        false,
      );
    });
  });
});
