import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from 'src/entities/user.entity';
import { User } from 'src/database/schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly _userModel: Model<UserDocument>,
  ) {}

  async findOne(filter: Partial<User>): Promise<User | null> {
    const result = await this._userModel.findOne(filter).lean().exec();
    return result as User | null;
  }

  async findById(userId: string): Promise<User | null> {
    const result = await this._userModel.findById(userId).lean().exec();
    return result as User | null;
  }

  async exists(userId: string): Promise<boolean> {
    const count = await this._userModel.countDocuments({ _id: userId }).exec();
    return count > 0;
  }
}
