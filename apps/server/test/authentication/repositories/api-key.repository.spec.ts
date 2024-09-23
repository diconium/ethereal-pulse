import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcryptLib from 'bcrypt';
import { CreateApiKeyDto } from '../../../src/api-key/dto/api-key.dto';
import { ApiKeyRepository } from '../../../src/api-key/repositories/api-key.repository';
import { ApiKeyDocument } from '../../../src/entities/api-key.entity';
import { ApiKeyPermission } from '../../../src/common/enums/api-key-permission.enum';
import { NotFoundException } from '@nestjs/common';

const mockApiKeyModel = () => ({
  create: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  findOneAndDelete: jest.fn(),
});

describe('ApiKeyRepository', () => {
  let repository: ApiKeyRepository;
  let model: Model<ApiKeyDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiKeyRepository,
        { provide: getModelToken('ApiKey'), useFactory: mockApiKeyModel },
      ],
    }).compile();

    repository = module.get<ApiKeyRepository>(ApiKeyRepository);
    model = module.get<Model<ApiKeyDocument>>(getModelToken('ApiKey'));
  });

  it('should create an API key', async () => {
    const createApiKeyDto: CreateApiKeyDto = {
      token: 'token-dummy',
      name: 'test',
      permission: ApiKeyPermission.FULL_ACCESS,
      userId: 'userId-dummy',
    };
    const mockApiKey = 'mockApiKey-dummy';

    (model.create as jest.Mock).mockResolvedValue('mockApiKey-dummy');

    const result = await repository.create(createApiKeyDto);
    expect(result).toEqual(mockApiKey);
    expect(model.create).toHaveBeenCalledWith(createApiKeyDto);
  });

  it('should find an API key by ID', async () => {
    const mockApiKey = 'mockApiKey-dummy';
    (model.findOne as jest.Mock).mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockApiKey),
    });

    const result = await repository.findOneById('someId');
    expect(result).toEqual(mockApiKey);
    expect(model.findOne).toHaveBeenCalledWith({ _id: 'someId' });
  });

  it('should find an API key by token', async () => {
    const mockApiKey = { token: 'hashedToken' };
    (model.find as jest.Mock).mockReturnValue({
      exec: jest.fn().mockResolvedValue([mockApiKey]),
    });

    jest
      .spyOn(bcryptLib, 'compare')
      .mockImplementation(() => Promise.resolve(true));

    const result = await repository.findOne('hashedToken');
    expect(result).toEqual(mockApiKey);
    expect(model.find).toHaveBeenCalled();
    expect(bcryptLib.compare).toHaveBeenCalledWith(
      'hashedToken',
      'hashedToken',
    );
  });

  it('should return when not find an API key by token', async () => {
    (model.find as jest.Mock).mockReturnValue({
      exec: jest
        .fn()
        .mockResolvedValue([
          { token: 'hashedToken1' },
          { token: 'hashedToken2' },
        ]),
    });
    jest
      .spyOn(bcryptLib, 'compare')
      .mockImplementation(() => Promise.resolve(false));
    const result = await repository.findOne('plainToken');
    expect(result).toEqual(null);
    expect(model.find).toHaveBeenCalled();
  });

  it('should find user ID by API key', async () => {
    const mockApiKey = { userId: 'userId' };
    jest.spyOn(repository, 'findOne').mockResolvedValue(mockApiKey as any);

    const result = await repository.findUserIdByApiKey('plainToken');
    expect(result).toEqual('userId');
    expect(repository.findOne).toHaveBeenCalledWith('plainToken');
  });

  it('should find all API keys', async () => {
    const mockApiKeys = [{ userId: 'userId' }];
    (model.find as jest.Mock).mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockApiKeys),
    });

    const result = await repository.findAll();
    expect(result).toEqual(mockApiKeys);
    expect(model.find).toHaveBeenCalled();
  });

  it('should find all API keys by user ID', async () => {
    const mockApiKeys = [{ userId: 'userId' }];
    (model.find as jest.Mock).mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockApiKeys),
    });

    const result = await repository.findAllByUserId('userId');
    expect(result).toEqual(mockApiKeys);
    expect(model.find).toHaveBeenCalledWith({ userId: 'userId' });
  });

  it('should delete an API key by ID and user ID', async () => {
    const mockApiKey = { userId: 'userId' };
    (model.findOneAndDelete as jest.Mock).mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockApiKey),
    });

    await repository.findByIdAndUserAndDelete('someId', 'userId');
    expect(model.findOneAndDelete).toHaveBeenCalledWith({
      _id: 'someId',
      userId: 'userId',
    });
  });

  it('should throw NotFoundException if API key not found for deletion', async () => {
    (model.findOneAndDelete as jest.Mock).mockReturnValue({
      exec: jest.fn().mockResolvedValue(null),
    });

    await expect(
      repository.findByIdAndUserAndDelete('someId', 'userId'),
    ).rejects.toThrow(NotFoundException);
  });
});
