import { Module } from '@nestjs/common';
import { GroupService } from './services/group.service';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { DatabaseModule } from 'src/database/database.module';
import { GroupController } from './controllers/group.controllers';
import { GroupRepository } from './repositories/group.repository';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { ApiKeyModule } from 'src/api-key/api-key.module';

@Module({
  imports: [DatabaseModule, ApiKeyModule, AuthenticationModule],
  providers: [GroupService, GroupRepository, ApiKeyGuard],
  controllers: [GroupController],
  exports: [GroupService],
})
export class GroupModule {}
