import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { ApiKeyRepository } from 'src/authentication/repositories/api-key.repository';
import { ApiKeyService } from 'src/api-key/services/api-key.service';
import { PostApiKeyRequestDto } from 'src/api-key/dto/api-key.dto';
import { ApiKeyPermission } from 'src/common/enums/api-key-permission.enum';
import { REQUEST } from '@nestjs/core';

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
        { _id: 'mock-id-1', name: 'Key 1', createdAt: new Date() },
        { _id: 'mock-id-2', name: 'Key 2', createdAt: new Date() },
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
          },
          {
            id: 'mock-id-2',
            name: 'Key 2',
            created_at: mockApiKeys[1].createdAt,
          },
        ],
      });
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
  });
});
