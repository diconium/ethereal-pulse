import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Group } from 'src/database/schemas/group.schema';
import { CreateGroupDto, UpdateGroupDto } from '../dto/group.dto';

@Injectable()
export class GroupRepository {
  constructor(
    @InjectModel('Group') private readonly groupModel: Model<Group>,
  ) {}

  async findAll(): Promise<Group[]> {
    return this.groupModel.find().exec();
  }

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    const newGroup = new this.groupModel(createGroupDto);
    return newGroup.save();
  }

  async update(
    id: string,
    updateGroupDto: UpdateGroupDto,
  ): Promise<Group | null> {
    return this.groupModel
      .findByIdAndUpdate(id, updateGroupDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<any> {
    return this.groupModel.findByIdAndDelete(id).exec();
  }
}
