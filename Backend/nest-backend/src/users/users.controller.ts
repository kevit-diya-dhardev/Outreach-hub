import {
  Controller,
  Post,
  Body,
  UsePipes,
  Get,
  ValidationPipe,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { updateUserDto, userDto } from './dto/user.dto';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() userData: userDto) {
    return this.userService.createUser(userData);
  }

  @Get()
  @UsePipes(new ValidationPipe())
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  getSingleUser(@Param('id') id: String) {
    return this.userService.getSingleUser(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  updateUser(@Param('id') id: String, @Body() userData: updateUserDto) {
    return this.userService.updateUser(id, userData);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  deleteUser(@Param('id') id: String) {
    return this.userService.deleteUser(id);
  }
}
