import { Injectable, Inject } from '@nestjs/common';
import config from 'config';
import { UserRepository } from 'src/shared/repositories/users.repository';
import { userTypes } from 'src/shared/schema/users';
import {
  comaprePassword,
  generateHashPassword,
} from 'src/shared/utility/password-manager';
import { generateToken } from 'src/shared/utility/token-generator';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UserRepository) private readonly userDB: UserRepository,
  ) {}

  // create a new user
  async create(_createUserDto: CreateUserDto) {
    try {
      // hash the user password and update the payload of body
      _createUserDto.password = await generateHashPassword(
        _createUserDto.password,
      );

      if (
        _createUserDto.type === 'admin' &&
        _createUserDto.secretToken !== config.get('adminCreateToken')
      ) {
        throw new Error('You are not authorized to create admin user');
      }

      // check if the user already exists
      const userExist = await this.userDB.getUserDetailsByEmail(
        _createUserDto.email,
      );
      if (userExist) {
        throw new Error('You already have an account with us. Please login.');
      }
      const newUser = await this.userDB.createNewUserInDB(_createUserDto);
      return {
        email: newUser.email,
        success: true,
        message: 'User registered successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  // login a new user
  async login(email: string, password: string): Promise<any> {
    try {
      const userExist = await this.userDB.getUserDetailsByEmail(email);
      if (!userExist) {
        throw new Error(
          `User is not exists with us. Please register yourself.`,
        );
      }
      // comapare password
      if (!(await comaprePassword(userExist.password, password))) {
        throw new Error(`Wrong email or password`);
      }

      return {
        result: {
          email,
          token: generateToken(userExist._id),
          type: userExist.type,
        },
        success: true,
        message: 'User logged in successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  async findAll(type: userTypes): Promise<any> {
    try {
      const users = await this.userDB.getAllUsers(type);
      return users;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<any> {
    try {
      const user = await this.userDB.getUserDetailsById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async updatePassword(id: string, data: any): Promise<any> {
    try {
      const { oldPassword, newPassword } = data;
      const userExist = await this.userDB.getUserDetailsById(id);
      if (!(await comaprePassword(userExist.password, oldPassword))) {
        throw new Error('Current password does not matched.');
      }
      const password = await generateHashPassword(newPassword);
      await this.userDB.updateUserDetails(id, { password });
      return {};
    } catch (error) {
      throw error;
    }
  }
}
