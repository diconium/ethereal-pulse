import { Test, TestingModule } from '@nestjs/testing';
import { TemplateDto, IdParamDto } from 'src/templates/dto/template.dto';
import { TemplateService } from 'src/templates/services/template.service';
import { TemplateController } from 'src/templates/controller/template.controller';
import { ApiKeyRepository } from 'src/authentication/repositories/api-key.repository';

describe('TemplateController', () => {
  let controller: TemplateController;
  let service: TemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemplateController],
      providers: [
        {
          provide: TemplateService,
          useValue: {
            findAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: ApiKeyRepository,
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TemplateController>(TemplateController);
    service = module.get<TemplateService>(TemplateService);

    (controller as any).templateService = service;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call findAll on the service', async () => {
    await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should call create on the service', async () => {
    const dto = new TemplateDto();
    await controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should call update on the service', async () => {
    const dto = new TemplateDto();
    const id = 'some-id';
    await controller.update(id, dto);
    expect(service.update).toHaveBeenCalledWith(id, dto);
  });

  it('should call remove on the service', async () => {
    const params: IdParamDto = { id: 'some-id' };
    await controller.remove(params);
    expect(service.remove).toHaveBeenCalledWith(params.id);
  });
});
