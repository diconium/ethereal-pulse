import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/database/schemas/user.schema';
import { Email, EmailDocument } from 'src/database/schemas/email.schema';
import { SendEmailRequestDto } from 'src/email-service/dto/send-email.dto';
import { AzureEmailResponse } from 'src/email-service/interfaces/azure.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Email.name) private readonly emailModel: Model<EmailDocument>,
  ) {}

  /**
   * Persists the email payload and response details in the database.
   * @param userId - The ID of the user to whom the email belongs.
   * @param payload - The email payload containing the email details.
   * @param response - The response from the email service containing delivery details.
   * @returns A promise that resolves when the email and user records are updated.
   */
  async persistEmailWithResponse(
    userId: string,
    payload: SendEmailRequestDto,
    response: AzureEmailResponse,
  ): Promise<void> {
    const email = new this.emailModel({
      ...payload,
      deliveryID: response.id,
      status: response.status,
    });
    const savedEmail = await email.save();

    await this.userModel.findByIdAndUpdate(
      userId,
      { $push: { emailsIds: savedEmail._id } },
      { new: true, useFindAndModify: false },
    );
  }
}
