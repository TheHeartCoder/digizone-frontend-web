import { Injectable, Inject } from '@nestjs/common';
import config from 'config';
import { UserRepository } from 'src/shared/repositories/users.repository';
import { userTypes } from 'src/shared/schema/users';
import { sendEmail } from 'src/shared/utility/mail-handler';
import {
  comaprePassword,
  generateHashPassword,
} from 'src/shared/utility/password-manager';
import { generateToken } from 'src/shared/utility/token-generator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UserRepository) private readonly userDB: UserRepository,
  ) {}

  // create / register a new user
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
      if (userExist && userExist.isVerified) {
        throw new Error('You already have an account with us. Please login.');
      }
      // generate otp
      const otp = Math.floor(Math.random() * 900000) + 100000;
      // otp expiery time
      const otpExpiryTime = new Date();
      otpExpiryTime.setMinutes(otpExpiryTime.getMinutes() + 10);

      const newUser = await this.userDB.createNewUserInDB(
        _createUserDto,
        otp,
        otpExpiryTime,
      );

      if (_createUserDto.type === 'admin') {
        // update isVerified flag for admin user
        await this.userDB.updateUserDetails(newUser._id, {
          isVerified: true,
        });
      } else {
        // send verifyEmail otp to user email
        sendEmail(
          _createUserDto.email,
          config.get('emailService.emailTemplates.verifyEmail'),
          'Email verification - Digizone',
          {
            customerName: _createUserDto.name,
            customerEmail: _createUserDto.email,
            otp: otp,
          },
        );
      }
      return {
        result: {
          email: newUser.email,
        },
        success: true,
        message:
          _createUserDto.type === 'admin'
            ? 'Admin user created successfully. You can now login'
            : 'Please activate your account by verifying your email. We have sent you an email with the OTP.',
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
      // check user is verified or not
      if (!userExist.isVerified) {
        throw new Error('Please verify your email.');
      }

      // comapare password
      if (!(await comaprePassword(userExist.password, password))) {
        throw new Error(`Wrong email or password`);
      }

      return {
        result: {
          user: {
            email: userExist.email,
            type: userExist.type,
            name: userExist.name,
            id: userExist._id.toString(),
          },
          token: generateToken(userExist._id),
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
      return {
        result: users,
        success: true,
        message: 'User logged in successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<any> {
    try {
      const user = await this.userDB.getUserDetailsById(id);
      return {
        result: user,
        success: true,
        message: 'User logged in successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  async updatePasswordOrName(id: string, data: UpdateUserDto): Promise<any> {
    try {
      const { oldPassword, newPassword, name } = data;
      if (!name && !newPassword) {
        throw new Error('Please provide data to update');
      }
      const userExist = await this.userDB.getUserDetailsById(id);
      if (!userExist) {
        throw new Error('User not found');
      }
      if (newPassword) {
        if (!(await comaprePassword(userExist.password, oldPassword))) {
          throw new Error('Current password does not matched.');
        }
        const password = await generateHashPassword(newPassword);
        await this.userDB.updateUserDetails(id, { password, name });
      } else if (name) {
        await this.userDB.updateUserDetails(id, { name });
      }

      return {
        result: {
          email: userExist.email,
          type: userExist.type,
          name: name || userExist.name,
          id: userExist._id.toString(),
        },
        success: true,
        message: 'Password updated successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  async forgotPassword(email: string): Promise<any> {
    try {
      const userExist = await this.userDB.getUserDetailsByEmail(email);
      if (!userExist) {
        throw new Error(
          `User is not exists with us. Please register yourself.`,
        );
      }
      // generate random password
      const password = Math.random().toString(36).substring(2, 12);
      const hashedPassword = await generateHashPassword(password);
      await this.userDB.updateUserDetails(userExist._id, {
        password: hashedPassword,
      });
      // send email with new password
      sendEmail(
        email,
        config.get('emailService.emailTemplates.forgotPassword'),
        'Forgot Password - Digizone',
        {
          customerName: userExist.name,
          customerEmail: email,
          newPassword: password,
          loginLink: config.get('loginLink'),
        },
      );

      return {
        success: true,
        message: 'New password sent to your email',
        result: {
          email,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async resendOtpMailMessage(email: string): Promise<any> {
    try {
      const userExist = await this.userDB.getUserDetailsByEmail(email);
      if (!userExist) {
        throw new Error(
          `User is not exists with us. Please register yourself.`,
        );
      }
      // generate otp
      const otp = Math.floor(Math.random() * 900000) + 100000;
      // otp expiery time
      const otpExpiryTime = new Date();
      otpExpiryTime.setMinutes(otpExpiryTime.getMinutes() + 10);

      await this.userDB.updateUserDetails(userExist._id, {
        otp,
        otpExpiryTime,
      });
      // send verifyEmail otp to user email
      sendEmail(
        email,
        config.get('emailService.emailTemplates.verifyEmail'),
        'Email verification - Digizone',
        {
          customerName: userExist.name,
          customerEmail: email,
          otp: otp,
        },
      );
      return {
        success: true,
        message: 'OTP sent to your email',
        result: {
          email,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async verifyEmail(otp: string, email: string): Promise<any> {
    try {
      const userExist = await this.userDB.getUserWithOtpAndEmail(otp, email);
      if (!userExist) {
        throw new Error(
          `User is not exists with us. Please register yourself.`,
        );
      }
      // check expiery time of otp
      const currentTime = new Date();
      if (currentTime > userExist.otpExpiryTime) {
        throw new Error('OTP is expired.');
      }
      await this.userDB.updateUserDetails(userExist._id, { isVerified: true });
      return {
        success: true,
        message: 'Email verified successfully. You can login now.',
      };
    } catch (error) {
      throw error;
    }
  }
}
