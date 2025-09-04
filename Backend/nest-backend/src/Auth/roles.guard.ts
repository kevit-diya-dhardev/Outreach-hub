import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/users/users.service';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
  
    const req = context.switchToHttp().getRequest();
    const userId = req.userData.id;
    const findUser = await this.userService.getSingleUser(userId);
    const isAdmin = findUser.isAdmin;
    console.log('isAdmin: ', isAdmin, 'requiredRoles: ', requiredRoles);
    if (requiredRoles[0] == 'admin' && isAdmin) {
      req.userData.isAdmin = true;
      return true;
    }
    const role = findUser.role;
    return requiredRoles.every((routeRole) => role.includes(routeRole));
  }
}
