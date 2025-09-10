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
  createUser(@Body() userData: userDto, @Req() req: any) {
    return this.userService.createUser(userData, req);
  }

  @Get()
  @UseGuards(AuthGuard)
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
  getSingleUser(@Param('id') id: String) {
    return this.userService.getSingleUser(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  updateUser(@Param('id') id: String, @Body() userData: updateUserDto) {
    return this.userService.updateUser(id, userData);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id') id: String) {
    return this.userService.deleteUser(id);
  }
}
