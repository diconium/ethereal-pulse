import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupService } from './services/group.service';
import { GroupSchema } from 'src/database/schemas/group.schema';
import { GroupController } from './controllers/group.controllers';
import { GroupRepository } from './repositories/group.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Group', schema: GroupSchema }]),
  ],
  providers: [GroupService, GroupRepository],
  controllers: [GroupController],
  exports: [GroupService],
})
export class GroupModule {}
