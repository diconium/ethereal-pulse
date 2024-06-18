import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from 'src/entities/user.entity';
import { User } from 'src/database/schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findOne(filter: any): Promise<User | null> {
    const result = await this.userModel.findOne(filter).lean().exec();
    return result as User | null;
  }

  async findById(userId: string): Promise<User | null> {
    const result = await this.userModel.findById(userId).lean().exec();
    return result as User | null;
  }
}
