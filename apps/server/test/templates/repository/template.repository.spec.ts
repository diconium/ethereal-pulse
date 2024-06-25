import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Template } from 'src/database/schemas/template.schema';
import { TemplateRepository } from 'src/templates/repositories/template.repository';

const mockTemplateDto = {
  name: 'Test Template',
  description: 'Test Description',
  subject: 'Test Subject',
  html: '<p>Test HTML</p>',
};

const mockTemplateModel = {
  find: jest.fn().mockReturnThis(),
  exec: jest.fn().mockResolvedValue([mockTemplateDto]),
  create: jest.fn().mockResolvedValue(mockTemplateDto),
  findByIdAndUpdate: jest.fn().mockReturnThis(),
  findByIdAndDelete: jest.fn().mockReturnThis(),
};

describe('TemplateRepository', () => {
  let repository: TemplateRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TemplateRepository,
        {
          provide: getModelToken(Template.name),
          useValue: mockTemplateModel,
        },
      ],
    }).compile();

    repository = module.get<TemplateRepository>(TemplateRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of templates', async () => {
      const result = await repository.findAll();
      expect(result).toEqual([mockTemplateDto]);
    });
  });

  describe('create', () => {
    it('should create a new template', async () => {
      const result = await repository.create(mockTemplateDto);
      expect(result).toEqual(mockTemplateDto);
    });
  });

  describe('findByIdAndUpdate', () => {
    it('should update and return the template', async () => {
      mockTemplateModel.exec.mockResolvedValueOnce(mockTemplateDto);
      const result = await repository.findByIdAndUpdate(
        'someId',
        mockTemplateDto,
      );
      expect(result).toEqual(mockTemplateDto);
    });

    it('should throw NotFoundException if template not found', async () => {
      mockTemplateModel.exec.mockResolvedValueOnce(null);
      await expect(
        repository.findByIdAndUpdate('someId', mockTemplateDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByIdAndDelete', () => {
    it('should delete the template', async () => {
      mockTemplateModel.exec.mockResolvedValueOnce(mockTemplateDto);
      await expect(
        repository.findByIdAndDelete('someId'),
      ).resolves.toBeUndefined();
    });

    it('should throw NotFoundException if template not found', async () => {
      mockTemplateModel.exec.mockResolvedValueOnce(null);
      await expect(repository.findByIdAndDelete('someId')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
