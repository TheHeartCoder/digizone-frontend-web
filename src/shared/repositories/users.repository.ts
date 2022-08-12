import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Users, userTypes } from '../schema/users';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(Users.name) private userModel: Model<Users>) {}

  // save user details
  async createNewUserInDB(
    data: CreateUserDto,
    otp: string | number,
    otpExpiryTime: Date,
  ): Promise<Users> {
    const userData = { ...data, otp, otpExpiryTime };
    // if email exists then update else create new user
    const userExist = await this.userModel.findOne({ email: userData.email });
    if (userExist) {
      return await this.userModel.findByIdAndUpdate(userExist._id, userData, {
        new: true,
      });
    } else {
      return await this.userModel.create(userData);
    }
  }
  // get user details by email
  async getUserDetailsByEmail(email: string): Promise<any> {
    return await this.userModel.findOne({ email });
  }
  // get user details by id
  async getUserDetailsById(id: string): Promise<any> {
    return await this.userModel.findById(id);
  }
  // update user details
  async updateUserDetails(id: string, data: any): Promise<any> {
    return await this.userModel.findByIdAndUpdate(id, data);
  }
  // delete user details
  async deleteUserDetails(id: string): Promise<any> {
    return await this.userModel.findByIdAndDelete(id);
  }
  // get all users
  async getAllUsers(type: userTypes): Promise<any> {
    return type
      ? await this.userModel.find({ type })
      : await this.userModel.find();
  }

  // get user with otp
  async getUserWithOtpAndEmail(otp: string, email: string): Promise<any> {
    return await this.userModel.findOne({ otp, email });
  }
}
