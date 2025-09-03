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
  UseGuards,
} from '@nestjs/common';
import { updateUserDto, userDto } from './dto/user.dto';
import { UserService } from './users.service';
import { AuthGuard } from 'src/Auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  createUser(@Body() userData: userDto) {
    return this.userService.createUser(userData);
  }

  @Get()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  getSingleUser(@Param('id') id: String) {
    return this.userService.getSingleUser(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  updateUser(@Param('id') id: String, @Body() userData: updateUserDto) {
    return this.userService.updateUser(id, userData);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  deleteUser(@Param('id') id: String) {
    return this.userService.deleteUser(id);
  }
}
