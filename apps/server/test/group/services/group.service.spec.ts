import { Test, TestingModule } from '@nestjs/testing';
import { GroupService } from 'src/group/services/group.service';
import { CreateGroupDto, UpdateGroupDto } from 'src/group/dto/group.dto';
import { GroupRepository } from 'src/group/repositories/group.repository';

describe('GroupService', () => {
  let service: GroupService;
  let repository: GroupRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupService,
        {
          provide: GroupRepository,
          useValue: {
            findAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GroupService>(GroupService);
    repository = module.get<GroupRepository>(GroupRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all groups', async () => {
    await service.getAllGroups();
    expect(repository.findAll).toHaveBeenCalled();
  });

  it('should create a group', async () => {
    const createGroupDto: CreateGroupDto = {
      name: 'Test Group',
      recipients: [],
      userId: 'userId',
    };
    await service.createGroup(createGroupDto);
    expect(repository.create).toHaveBeenCalledWith(createGroupDto);
  });

  it('should update a group', async () => {
    const updateGroupDto: UpdateGroupDto = {
      name: 'Updated Group',
      recipients: [],
      userId: 'userId',
    };
    const id = 'groupId';
    await service.updateGroup(id, updateGroupDto);
    expect(repository.update).toHaveBeenCalledWith(id, updateGroupDto);
  });

  it('should delete a group', async () => {
    const id = 'groupId';
    await service.deleteGroup(id);
    expect(repository.delete).toHaveBeenCalledWith(id);
  });
});
