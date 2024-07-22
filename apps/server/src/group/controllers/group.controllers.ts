import { GroupService } from '../services/group.service';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { CreateGroupDto, UpdateGroupDto } from '../dto/group.dto';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';

@Controller('groups')
@UseGuards(ApiKeyGuard)
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get()
  async getAllGroups() {
    return this.groupService.getAllGroups();
  }

  @Post()
  async createGroup(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.createGroup(createGroupDto);
  }

  @Put(':id')
  async updateGroup(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    return this.groupService.updateGroup(id, updateGroupDto);
  }

  @Delete(':id')
  async deleteGroup(@Param('id') id: string) {
    return this.groupService.deleteGroup(id);
  }
}
