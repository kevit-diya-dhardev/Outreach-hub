import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/users/users.service';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    console.log('Inside users roleguard!!');
    const req = context.switchToHttp().getRequest();
    const userId = req.userData.userId;
    const findUser: any = await this.usersService.getSingleUser(userId);

    const role = findUser.role;
    return requiredRoles.some((userRole) => {
      return role.includes(userRole);
    });
  }
}
