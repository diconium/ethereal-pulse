import { Test, TestingModule } from '@nestjs/testing';
import { GroupService } from 'src/group/services/group.service';
import { CreateGroupDto, UpdateGroupDto } from 'src/group/dto/group.dto';
import { GroupController } from 'src/group/controllers/group.controllers';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { ApiKeyRepository } from 'src/authentication/repositories/api-key.repository';

describe('GroupController', () => {
  let controller: GroupController;
  let service: GroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupController],
      providers: [
        {
          provide: GroupService,
          useValue: {
            getAllGroups: jest.fn(),
            createGroup: jest.fn(),
            updateGroup: jest.fn(),
            deleteGroup: jest.fn(),
          },
        },
        {
          provide: ApiKeyRepository,
          useValue: {},
        },
        ApiKeyGuard,
      ],
    }).compile();

    controller = module.get<GroupController>(GroupController);
    service = module.get<GroupService>(GroupService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all groups', async () => {
    await controller.getAllGroups();
    expect(service.getAllGroups).toHaveBeenCalled();
  });

  it('should create a group', async () => {
    const createGroupDto: CreateGroupDto = {
      name: 'Test Group',
      recipients: [],
      userId: 'userId',
    };
    await controller.createGroup(createGroupDto);
    expect(service.createGroup).toHaveBeenCalledWith(createGroupDto);
  });

  it('should update a group', async () => {
    const updateGroupDto: UpdateGroupDto = {
      name: 'Updated Group',
      recipients: [],
      userId: 'userId',
    };
    const id = 'groupId';
    await controller.updateGroup(id, updateGroupDto);
    expect(service.updateGroup).toHaveBeenCalledWith(id, updateGroupDto);
  });

  it('should delete a group', async () => {
    const id = 'groupId';
    await controller.deleteGroup(id);
    expect(service.deleteGroup).toHaveBeenCalledWith(id);
  });
});
