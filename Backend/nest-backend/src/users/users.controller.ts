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
  Query,
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
  async createUser(@Body() userData: userDto, @Req() req: any) {
    return await this.userService.createUser(userData, req);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getUsers(@Query('page') page: number) {
    return await this.userService.getUsers(page);
  }
  @Get('my-users')
  @UseGuards(AuthGuard)
  async getMyUsers(@Req() req: any, @Query('page') page: number) {
    return await this.userService.getMyUsers(req, page);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getSingleUser(@Param('id') id: String) {
    return await this.userService.getSingleUser(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async updateUser(@Param('id') id: String, @Body() userData: updateUserDto) {
    return await this.userService.updateUser(id, userData);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteUser(@Param('id') id: String) {
    return await this.userService.deleteUser(id);
  }
}
