import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Users } from '../schema/users';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(Users.name) private userModel: Model<Users>) {}

  // save user details
  async createNewUserInDB(data: CreateUserDto): Promise<Users> {
    const user = new this.userModel(data);
    return await user.save();
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
  async getAllUsers(): Promise<any> {
    return await this.userModel.find();
  }
}
