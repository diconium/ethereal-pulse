import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserModel } from 'src/entities/user.entity';
import { User } from 'src/database/schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) // Ensure the correct model name is used
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findOne(filter: any): Promise<User | null> {
    const result = await this.userModel.findOne(filter).lean().exec();
    return result as User | null;
  }
}
