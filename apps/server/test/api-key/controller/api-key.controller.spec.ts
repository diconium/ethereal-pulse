import { Test, TestingModule } from '@nestjs/testing';
import { ApiKeyController } from 'src/api-key/controllers/api-key.controller';
import {
  GetApiKeysWrapperResponseDto,
  IdParamDto,
  PostApiKeyRequestDto,
  PostApiKeyResponseDto,
} from 'src/api-key/dto/api-key.dto';
import { ApiKeyService } from 'src/api-key/services/api-key.service';
import { ApiKeyRepository } from 'src/authentication/repositories/api-key.repository';
import { ApiKeyPermission } from 'src/common/enums/api-key-permission.enum';

describe('ApiKeyController', () => {
  let controller: ApiKeyController;
  let service: ApiKeyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiKeyController,
        {
          provide: ApiKeyService,
          useValue: {
            findAll: jest.fn(),
            createApiKey: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: ApiKeyRepository,
          useValue: {
            findAll: jest.fn(),
            findByIdAndDelete: jest.fn(),
            findUserIdByApiKey: jest.fn(),
            findOneWithProvider: jest.fn(),
            findOne: jest.fn(),
            findOneById: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ApiKeyController>(ApiKeyController);
    service = module.get<ApiKeyService>(ApiKeyService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of API keys', async () => {
      const mockApiKeys: GetApiKeysWrapperResponseDto = {
        data: [
          { id: '1', name: 'Key 1', created_at: new Date() },
          { id: '2', name: 'Key 2', created_at: new Date() },
        ],
      };
      (service.findAll as jest.Mock).mockResolvedValue(mockApiKeys);

      const result = await controller.findAll();

      expect(result).toEqual(mockApiKeys);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('createApiKey', () => {
    it('should create a new API key', async () => {
      const payload: PostApiKeyRequestDto = {
        name: 'New Key',
        permission: ApiKeyPermission.FULL_ACCESS,
        domainId: 'domainTest',
      };
      const mockApiResponse: PostApiKeyResponseDto = {
        id: '1',
        token: 'token',
      };
      (service.createApiKey as jest.Mock).mockResolvedValue(mockApiResponse);

      const result = await controller.createApiKey(payload);

      expect(result).toEqual(mockApiResponse);
      expect(service.createApiKey).toHaveBeenCalledWith(payload);
    });
  });

  describe('remove', () => {
    it('should remove an API key by ID', async () => {
      const params: IdParamDto = { id: '1' };

      await expect(controller.remove(params)).resolves.not.toThrow();
      expect(service.remove).toHaveBeenCalledWith(params.id);
    });
  });
});
