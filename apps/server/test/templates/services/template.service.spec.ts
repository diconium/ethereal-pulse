import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TemplateDto } from 'src/templates/dto/template.dto';
import { TemplateService } from 'src/templates/services/template.service';
import { TemplateRepository } from 'src/templates/repositories/template.repository';

describe('TemplateService', () => {
  let service: TemplateService;
  let repository: TemplateRepository;

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
      ],
    }).compile();

    service = module.get<TemplateService>(TemplateService);
    repository = module.get<TemplateRepository>(TemplateRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call findAll on the repository', async () => {
    await service.findAll();
    expect(repository.findAll).toHaveBeenCalled();
  });

  it('should call create on the repository', async () => {
    const dto = new TemplateDto();
    await service.create(dto);
    expect(repository.create).toHaveBeenCalledWith(dto);
  });

  it('should call findByIdAndUpdate on the repository', async () => {
    const dto = new TemplateDto();
    const id = 'some-id';
    await service.update(id, dto);
    expect(repository.findByIdAndUpdate).toHaveBeenCalledWith(id, dto);
  });

  it('should throw BadRequestException if id is not provided for remove', async () => {
    await expect(service.remove('')).rejects.toThrow(BadRequestException);
  });

  it('should call findByIdAndDelete on the repository', async () => {
    const id = 'some-id';
    await service.remove(id);
    expect(repository.findByIdAndDelete).toHaveBeenCalledWith(id);
  });
});
