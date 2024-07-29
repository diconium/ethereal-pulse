import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupModule } from 'src/group/group.module';
import { Test, TestingModule } from '@nestjs/testing';
import { GroupService } from 'src/group/services/group.service';
import { Group, GroupSchema } from 'src/database/schemas/group.schema';
import { GroupController } from 'src/group/controllers/group.controllers';
import { GroupRepository } from 'src/group/repositories/group.repository';
import { AuthenticationModule } from 'src/authentication/authentication.module';

// TODO: Fix the tests
// eslint-disable-next-line jest/no-disabled-tests
describe.skip('GroupModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        MongooseModule.forRoot('mongodb://localhost:27017/test'),
        MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
        AuthenticationModule,
        GroupModule,
      ],
    }).compile();
  });

  it('should compile the module', async () => {
    expect(module).toBeDefined();
  });

  it('should have GroupService', () => {
    const groupService = module.get<GroupService>(GroupService);
    expect(groupService).toBeDefined();
  });

  it('should have GroupRepository', () => {
    const groupRepository = module.get<GroupRepository>(GroupRepository);
    expect(groupRepository).toBeDefined();
  });

  it('should have GroupController', () => {
    const groupController = module.get<GroupController>(GroupController);
    expect(groupController).toBeDefined();
  });
});
