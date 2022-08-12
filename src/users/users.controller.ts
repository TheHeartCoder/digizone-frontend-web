import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Res,
  HttpStatus,
  HttpCode,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { userTypes } from 'src/shared/schema/users';
import { Roles } from 'src/shared/middleware/roles.decorators';
import { Response } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginUserDto: any,
    @Res({ passthrough: true }) response: Response,
  ) {
    const loginRes = await this.usersService.login(
      loginUserDto.email,
      loginUserDto.password,
    );
    if (loginRes.success) {
      // add token to response cookies
      response.cookie('_digi_auth_token', loginRes.result?.token, {
        httpOnly: true,
        // secure: true, // only works on https
      });
    }
    delete loginRes.token; //delete token from response body
    return loginRes;
  }

  @Get()
  @Roles(userTypes.admin)
  async findAll(@Query('type') type: userTypes) {
    return await this.usersService.findAll(type);
  }

  @Get(':id')
  async afindOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Patch('/update-name-password/:id')
  async updatePassword(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.updatePasswordOrName(id, updateUserDto);
  }

  @Get('/verify-email/:otp/:email')
  async verifyEmail(@Param('otp') otp: string, @Param('email') email: string) {
    return await this.usersService.verifyEmail(otp, email);
  }

  @Get('/forgot-password/:email')
  async forgotPassword(@Param('email') email: string) {
    return await this.usersService.forgotPassword(email);
  }

  @Get('/send-otp-mail/:email')
  async sendOTPMail(@Param('email') email: string) {
    return await this.usersService.resendOtpMailMessage(email);
  }

  @Put('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('_digi_auth_token');
    return res.status(HttpStatus.OK).json({
      message: 'User logged out successfully!',
    });
  }
}
