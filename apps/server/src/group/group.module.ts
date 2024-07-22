import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupService } from './services/group.service';
import { GroupController } from './controllers/group.controllers';
import { GroupRepository } from './repositories/group.repository';
import { Group, GroupSchema } from 'src/database/schemas/group.schema';
import { AuthenticationModule } from 'src/authentication/authentication.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
    AuthenticationModule,
  ],
  providers: [GroupService, GroupRepository],
  controllers: [GroupController],
  exports: [GroupService],
})
export class GroupModule {}
