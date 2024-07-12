import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiKey } from 'src/database/schemas/api-key.schema';
import { ApiKeyRepository } from 'src/authentication/repositories/api-key.repository';
import { CreateApiKeyDto } from 'src/api-key/dto/api-key.dto';
import { ApiKeyPermission } from 'src/common/enums/api-key-permission.enum';

const mockApiKeyDto = {
  name: 'Test ApiKey',
  permission: ApiKeyPermission.FULL_ACCESS,
  createdAt: new Date(2024),
  token: 'test token',
  userId: 'test user id',
};
const mockCreateApiKeyDto: CreateApiKeyDto = {
  name: 'Test ApiKey',
  permission: ApiKeyPermission.FULL_ACCESS,
  token: 'test token',
  userId: 'test user id',
};

const mockApiKeyModel = {
  find: jest.fn().mockReturnThis(),
  exec: jest.fn().mockResolvedValue([mockApiKeyDto]),
  create: jest.fn().mockResolvedValue(mockApiKeyDto),
  findByIdAndUpdate: jest.fn().mockReturnThis(),
  findOneAndDelete: jest.fn().mockReturnThis(),
};

describe('ApiKeyRepository', () => {
  let repository: ApiKeyRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiKeyRepository,
        {
          provide: getModelToken(ApiKey.name),
          useValue: mockApiKeyModel,
        },
      ],
    }).compile();

    repository = module.get<ApiKeyRepository>(ApiKeyRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of api-keys', async () => {
      const result = await repository.findAll();
      expect(result).toEqual([mockApiKeyDto]);
    });
  });

  describe('create', () => {
    it('should create a new api-key', async () => {
      const result = await repository.create(mockCreateApiKeyDto);
      expect(result).toEqual(mockApiKeyDto);
    });
  });

  describe('findByIdAndDelete', () => {
    it('should delete the api-key', async () => {
      mockApiKeyModel.exec.mockResolvedValueOnce(mockApiKeyDto);
      await expect(
        repository.findByIdAndUserAndDelete('someId', 'test user id'),
      ).resolves.toBeUndefined();
    });

    it('should throw NotFoundException if api-key not found', async () => {
      mockApiKeyModel.exec.mockResolvedValueOnce(null);
      await expect(
        repository.findByIdAndUserAndDelete('someId', 'test user id'),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
