import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/users/users.service';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    console.log('Inside admin roleguard!');
    const req = context.switchToHttp().getRequest();
    const userId = req.userData.userId;
    const findUser = await this.userService.getSingleUser(userId);
    const isAdmin = findUser.isAdmin;
    console.log('isAdmin: ', isAdmin, 'requiredRoles: ', requiredRoles);
    if (!requiredRoles) return true;
    if (requiredRoles[0] == 'admin' && isAdmin) {
      return true;
    }
    throw new ForbiddenException(
      `Role admin is only allowed to access this route`,
    );
  }
}
