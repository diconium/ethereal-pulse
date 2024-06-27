import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TemplateDto } from 'src/templates/dto/template.dto';
import { UserRepository } from 'src/user/repositories/user.repository';
import { TemplateService } from 'src/templates/services/template.service';
import { TemplateRepository } from 'src/templates/repositories/template.repository';

describe('TemplateService', () => {
  let service: TemplateService;
  let templateRepository: TemplateRepository;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TemplateService,
        {
          provide: TemplateRepository,
          useValue: {
            findAll: jest.fn(),
            create: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
        {
          provide: UserRepository,
          useValue: {
            exists: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TemplateService>(TemplateService);
    templateRepository = module.get<TemplateRepository>(TemplateRepository);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call findAll on the repository', async () => {
    await service.findAll();
    expect(templateRepository.findAll).toHaveBeenCalled();
  });

  it('should call create on the repository', async () => {
    const dto = new TemplateDto();
    await service.create(dto);
    expect(templateRepository.create).toHaveBeenCalledWith(dto);
  });

  it('should validate userId in create method', async () => {
    const dto = new TemplateDto();
    dto.userId = 'valid-user-id';
    (userRepository.exists as jest.Mock).mockResolvedValue(true);

    await service.create(dto);
    expect(userRepository.exists).toHaveBeenCalledWith(dto.userId);
    expect(templateRepository.create).toHaveBeenCalledWith(dto);
  });

  it('should throw BadRequestException for invalid userId in create method', async () => {
    const dto = new TemplateDto();
    dto.userId = 'invalid-user-id';
    (userRepository.exists as jest.Mock).mockResolvedValue(false);

    await expect(service.create(dto)).rejects.toThrow(BadRequestException);
  });

  it('should call findByIdAndUpdate on the repository', async () => {
    const dto = new TemplateDto();
    const id = 'some-id';
    await service.update(id, dto);
    expect(templateRepository.findByIdAndUpdate).toHaveBeenCalledWith(id, dto);
  });

  it('should validate userId in update method', async () => {
    const dto = new TemplateDto();
    dto.userId = 'valid-user-id';
    const id = 'some-id';
    (userRepository.exists as jest.Mock).mockResolvedValue(true);

    await service.update(id, dto);
    expect(userRepository.exists).toHaveBeenCalledWith(dto.userId);
    expect(templateRepository.findByIdAndUpdate).toHaveBeenCalledWith(id, dto);
  });

  it('should throw BadRequestException for invalid userId in update method', async () => {
    const dto = new TemplateDto();
    dto.userId = 'invalid-user-id';
    const id = 'some-id';
    (userRepository.exists as jest.Mock).mockResolvedValue(false);

    await expect(service.update(id, dto)).rejects.toThrow(BadRequestException);
  });

  it('should throw BadRequestException if id is not provided for remove', async () => {
    await expect(service.remove('')).rejects.toThrow(BadRequestException);
  });

  it('should call findByIdAndDelete on the repository', async () => {
    const id = 'some-id';
    await service.remove(id);
    expect(templateRepository.findByIdAndDelete).toHaveBeenCalledWith(id);
  });
});
