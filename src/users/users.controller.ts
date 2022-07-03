import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async afindOne(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }

  @Patch('/update-password/:id')
  async updatePassword(@Param('id') id: string, @Body() updateUserDto: any) {
    return await this.usersService.updatePassword(id, updateUserDto);
  }
}
