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
import { Roles } from 'src/Auth/Roles/roles.decorator';
import { AuthGuard } from 'src/Auth/auth.guard';
import { AdminRoleGuard } from 'src/Auth/Roles/adminRole.guard';
import { Auth } from 'src/Auth/auth.schema';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  @Roles('admin')
  @UseGuards(AuthGuard, AdminRoleGuard)
  async createUser(@Body() userData: userDto, @Req() req: any) {
    return await this.userService.createUser(userData, req);
  }

  @Get()
  @Roles('admin')
  @UseGuards(AuthGuard, AdminRoleGuard)
  async getUsers(@Query('page') page: number) {
    return await this.userService.getUsers(page);
  }
  @Get('my-users')
  @Roles('admin')
  @UseGuards(AuthGuard, AdminRoleGuard)
  async getMyUsers(@Req() req: any, @Query('page') page: number) {
    return await this.userService.getMyUsers(req, page);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getSingleUser(@Param('id') id: String) {
    return await this.userService.getSingleUser(id);
  }

  @Patch(':id')
  @Roles('admin')
  @UseGuards(AuthGuard, AdminRoleGuard)
  async updateUser(@Param('id') id: String, @Body() userData: updateUserDto) {
    return await this.userService.updateUser(id, userData);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(AuthGuard, AdminRoleGuard)
  async deleteUser(@Param('id') id: String) {
    return await this.userService.deleteUser(id);
  }

  @Get('workspace-users/:workspace_id')
  @Roles('admin')
  @UseGuards(AuthGuard, AdminRoleGuard)
  async getWorkspaceUsers(@Param('workspace_id') workspace_id: string) {
    return this.userService.getWorkspaceUsers(workspace_id);
  }
}
