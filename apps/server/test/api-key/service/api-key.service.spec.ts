import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { ApiKeyRepository } from 'src/authentication/repositories/api-key.repository';
import { ApiKeyService } from 'src/api-key/services/api-key.service';
import { PostApiKeyRequestDto } from 'src/api-key/dto/api-key.dto';
import { ApiKeyPermission } from 'src/common/enums/api-key-permission.enum';
import { REQUEST } from '@nestjs/core';
import * as apikeyLib from 'src/common/utils/utils';

describe('ApiKeyService', () => {
  let service: ApiKeyService;
  let repository: ApiKeyRepository;

  beforeEach(async () => {
    const req = { headers: { 'x-api-key': 'TEST Api Key' } };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiKeyService,
        {
          provide: ApiKeyRepository,
          useValue: {
            findAll: jest.fn(),
            findAllByUserId: jest.fn(),
            create: jest.fn(),
            findByIdAndUserAndDelete: jest.fn(),
            findUserIdByApiKey: jest.fn(),
          },
        },
        { provide: REQUEST, useValue: req },
      ],
    }).compile();

    service = await module.resolve<ApiKeyService>(ApiKeyService);
    repository = module.get<ApiKeyRepository>(ApiKeyRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of API keys', async () => {
      const mockApiKeys = [
        {
          _id: 'mock-id-1',
          name: 'Key 1',
          createdAt: new Date(),
          permission: ApiKeyPermission.FULL_ACCESS,
        },
        {
          _id: 'mock-id-2',
          name: 'Key 2',
          createdAt: new Date(),
          permission: ApiKeyPermission.SENDING_ACCESS,
        },
      ];
      const mockUserId = 'user id test';
      (repository.findAllByUserId as jest.Mock).mockResolvedValue(mockApiKeys);
      (repository.findUserIdByApiKey as jest.Mock).mockResolvedValue(
        mockUserId,
      );

      const result = await service.findAll();

      expect(result).toEqual({
        data: [
          {
            id: 'mock-id-1',
            name: 'Key 1',
            created_at: mockApiKeys[0].createdAt,
            permission: ApiKeyPermission.FULL_ACCESS,
          },
          {
            id: 'mock-id-2',
            name: 'Key 2',
            created_at: mockApiKeys[1].createdAt,
            permission: ApiKeyPermission.SENDING_ACCESS,
          },
        ],
      });
    });
    it('should throw exception when the service to fetch user did not find the user', async () => {
      (repository.findUserIdByApiKey as jest.Mock).mockReturnValue(undefined);

      await expect(service.findAll()).rejects.toThrow();
    });

    it('should throw exception when the api key is invalid', async () => {
      (repository.findUserIdByApiKey as jest.Mock).mockReturnValue(undefined);
      jest.spyOn(apikeyLib, 'getApiKeyFromRequest').mockReturnValue(undefined);
      await expect(service.findAll()).rejects.toThrow();
    });
  });

  describe('createApiKey', () => {
    it('should create a new API key', async () => {
      const payload: PostApiKeyRequestDto = {
        name: 'New Key',
        permission: ApiKeyPermission.FULL_ACCESS,
        domainId: 'Test',
      };
      const mockApiKeyDocument = { _id: 'mock-id', token: 'mock-token' };
      const mockUserId = 'user id test';

      (repository.findUserIdByApiKey as jest.Mock).mockResolvedValue(
        mockUserId,
      );
      (repository.create as jest.Mock).mockResolvedValue(mockApiKeyDocument);

      const result = await service.createApiKey(payload);

      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          name: payload.name,
          userId: mockUserId,
          token: expect.any(String),
        }),
      );
      expect(result).toEqual({ id: 'mock-id', ...result });
    });
    it('should throw exception when the service to fetch user did not find the user', async () => {
      const payload: PostApiKeyRequestDto = {
        name: 'New Key',
        permission: ApiKeyPermission.FULL_ACCESS,
        domainId: 'Test',
      };
      (repository.findUserIdByApiKey as jest.Mock).mockReturnValue(undefined);

      await expect(service.createApiKey(payload)).rejects.toThrow();
    });

    it('should throw exception when the api key is invalid', async () => {
      jest.spyOn(apikeyLib, 'getApiKeyFromRequest').mockReturnValue(undefined);

      const payload: PostApiKeyRequestDto = {
        name: 'New Key',
        permission: ApiKeyPermission.FULL_ACCESS,
        domainId: 'Test',
      };
      (repository.findUserIdByApiKey as jest.Mock).mockReturnValue(undefined);

      await expect(service.createApiKey(payload)).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should remove an API key by ID', async () => {
      const apiKeyId = '667c3409060e3a60c1be021f';
      const mockUserId = 'user id test';

      (repository.findUserIdByApiKey as jest.Mock).mockResolvedValue(
        mockUserId,
      );
      (repository.findByIdAndUserAndDelete as jest.Mock).mockResolvedValueOnce(
        undefined,
      );

      await service.remove(apiKeyId);

      expect(repository.findByIdAndUserAndDelete).toHaveBeenCalledWith(
        apiKeyId,
        mockUserId,
      );
    });

    it('should throw BadRequestException for invalid ID', async () => {
      const invalidId = 'invalid-id';
      (repository.findByIdAndUserAndDelete as jest.Mock).mockResolvedValueOnce(
        undefined,
      );

      await expect(service.remove(invalidId)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw exception when the service to fetch user did not find the user', async () => {
      (repository.findUserIdByApiKey as jest.Mock).mockReturnValue(undefined);

      await expect(service.remove('dddd')).rejects.toThrow();
    });

    it('should throw exception when the api key is invalid', async () => {
      (repository.findUserIdByApiKey as jest.Mock).mockReturnValue(undefined);
      jest.spyOn(apikeyLib, 'getApiKeyFromRequest').mockReturnValue(undefined);
      await expect(service.remove('dddd')).rejects.toThrow();
    });
  });
});
