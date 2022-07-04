import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { userTypes } from 'src/shared/schema/users';
import { Roles } from 'src/shared/middleware/roles.decorators';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Post('/login')
  async login(@Body() loginUserDto: any) {
    return await this.usersService.login(
      loginUserDto.email,
      loginUserDto.password,
    );
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

  @Patch('/update-password/:id')
  async updatePassword(@Param('id') id: string, @Body() updateUserDto: any) {
    return await this.usersService.updatePassword(id, updateUserDto);
  }
}
