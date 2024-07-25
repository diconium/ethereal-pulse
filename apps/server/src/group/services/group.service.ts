import { GroupRepository } from '../repositories/group.repository';
import { CreateGroupDto, UpdateGroupDto } from '../dto/group.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GroupService {
  constructor(private readonly groupRepository: GroupRepository) {}

  async getAllGroups(): Promise<any> {
    return this.groupRepository.findAll();
  }

  async createGroup(createGroupDto: CreateGroupDto): Promise<any> {
    return this.groupRepository.create(createGroupDto);
  }

  async updateGroup(id: string, updateGroupDto: UpdateGroupDto): Promise<any> {
    return this.groupRepository.update(id, updateGroupDto);
  }

  async deleteGroup(id: string): Promise<any> {
    return this.groupRepository.delete(id);
  }
}
