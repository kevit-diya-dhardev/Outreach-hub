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
  Req,
} from '@nestjs/common';
import { updateUserDto, userDto } from './dto/user.dto';
import { UserService } from './users.service';
import { Roles } from 'src/Auth/roles.decorator';
import { AuthGuard } from 'src/Auth/auth.guard';
import { RolesGuard } from 'src/Auth/roles.guard';

@UseGuards(AuthGuard, RolesGuard)
@Roles('admin')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  createUser(@Body() userData: userDto, @Req() req: any) {
    return this.userService.createUser(userData, req);
  }

  @Get()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  getUsers() {
    return this.userService.getUsers();
  }
  @Get('my-users')
  @UseGuards(AuthGuard)
  getMyUsers(@Req() req: any) {
    return this.userService.getMyUsers(req);
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
