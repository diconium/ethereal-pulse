import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Group } from 'src/database/schemas/group.schema';
import { CreateGroupDto, UpdateGroupDto } from 'src/group/dto/group.dto';
import { GroupRepository } from 'src/group/repositories/group.repository';

describe('GroupRepository', () => {
  let repository: GroupRepository;
  let model: Model<Group>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupRepository,
        {
          provide: getModelToken('Group'),
          useValue: {
            find: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<GroupRepository>(GroupRepository);
    model = module.get<Model<Group>>(getModelToken('Group'));
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should find all groups', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce([]),
    } as any);
    const result = await repository.findAll();
    expect(result).toEqual([]);
  });

  it('should create a group', async () => {
    const createGroupDto: CreateGroupDto = {
      name: 'Test Group',
      recipients: [],
      userId: 'userId',
    };
    jest
      .spyOn(model, 'create')
      .mockImplementationOnce(() => createGroupDto as any);
    const result = await repository.create(createGroupDto);
    expect(result).toEqual(createGroupDto);
  });

  it('should update a group', async () => {
    const updateGroupDto: UpdateGroupDto = {
      name: 'Updated Group',
      recipients: [],
      userId: 'userId',
    };
    const id = 'groupId';
    jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(updateGroupDto),
    } as any);
    const result = await repository.update(id, updateGroupDto);
    expect(result).toEqual(updateGroupDto);
  });

  it('should delete a group', async () => {
    const id = 'groupId';
    jest.spyOn(model, 'findByIdAndDelete').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce({}),
    } as any);
    const result = await repository.delete(id);
    expect(result).toEqual({});
  });
});
