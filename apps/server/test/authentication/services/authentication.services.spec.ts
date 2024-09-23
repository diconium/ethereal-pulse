import { ApiKeyRepository } from '../../../src/api-key/repositories/api-key.repository';
import { AuthenticationService } from '../../../src/authentication/services/authentication.service';
import { UserRepository } from '../../../src/user/repositories/user.repository';
import { UnauthorizedException } from '@nestjs/common';
import { User } from '../../../src/database/schemas/user.schema';
import { Test, TestingModule } from '@nestjs/testing';

const mockUserRepository = () => ({
  findOne: jest.fn(),
  findById: jest.fn(),
  exists: jest.fn(),
});

const mockApiKeyRepository = () => ({
  findUserIdByApiKey: jest.fn(),
});

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let userRepository: UserRepository;
  let apiKeyRepository: ApiKeyRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        { provide: UserRepository, useFactory: mockUserRepository },
        { provide: ApiKeyRepository, useFactory: mockApiKeyRepository },
      ],
    }).compile();

    service = module.get<AuthenticationService>(AuthenticationService);
    userRepository = module.get<UserRepository>(UserRepository);
    apiKeyRepository = module.get<ApiKeyRepository>(ApiKeyRepository);
  });

  describe('validateUser', () => {
    it('should return the user when a valid API key is provided', async () => {
      const apiKey = 'validApiKey';
      const userId = 'validUserId';
      const userDummy: User = {
        email: 'email-dummy',
        password: 'password-dummy',
        firstName: 'firstName-dummy',
        lastName: 'lastName-dummy',
        emailsIds: [],
        groupsIds: [],
        templatesIds: [],
        apiKeysIds: [],
      };
      (apiKeyRepository.findUserIdByApiKey as jest.Mock).mockResolvedValue(
        userId,
      );

      (userRepository.findById as jest.Mock).mockImplementation(
        () =>
          new Promise((resolve) => {
            resolve(userDummy);
          }),
      );

      const result = await service.validateUser(apiKey);

      expect(result).toEqual(userDummy);
      expect(apiKeyRepository.findUserIdByApiKey).toHaveBeenCalledWith(apiKey);
      expect(userRepository.findById).toHaveBeenCalledWith(userId);
    });

    it('should throw UnauthorizedException when an invalid API key is provided', async () => {
      const apiKey = 'validApiKey';

      (apiKeyRepository.findUserIdByApiKey as jest.Mock).mockResolvedValue(
        null,
      );

      await expect(service.validateUser(apiKey)).rejects.toThrow(
        new UnauthorizedException(),
      );
      expect(apiKeyRepository.findUserIdByApiKey).toHaveBeenCalledWith(apiKey);
    });

    it('should throw UnauthorizedException when an does not exists a user with the id provided', async () => {
      const apiKey = 'validApiKey';
      const userId = 'invalidUserId';

      (apiKeyRepository.findUserIdByApiKey as jest.Mock).mockResolvedValue(
        userId,
      );

      (userRepository.findById as jest.Mock).mockImplementation(
        () =>
          new Promise((resolve) => {
            resolve(null);
          }),
      );

      await expect(service.validateUser(apiKey)).rejects.toThrow(
        new UnauthorizedException(),
      );
      expect(apiKeyRepository.findUserIdByApiKey).toHaveBeenCalledWith(apiKey);
    });
  });
});
