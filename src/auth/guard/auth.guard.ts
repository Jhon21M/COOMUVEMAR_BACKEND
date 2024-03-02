import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { matchRoles } from 'src/auth/util';
import { Request } from 'express';
import { AuthInterface } from '../interfaces';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    //console.log('RolesGuard');
    const rolesRequired = this.reflector.get<string[]>(
      'roles',
      ctx.getHandler(),
    );
    //console.log(rolesRequired);
    if (!rolesRequired) {
      return true; // Si no se especifican roles, permitir el acceso
    }

    const request = ctx.switchToHttp().getRequest<Request>();
    const userInfo = request.user as AuthInterface;
    //console.log(userInfo);
    if (userInfo) {
      //Verificar si el usuario tiene al menos uno de los roles requeridos
      return matchRoles(rolesRequired, userInfo.role);
    }
    return true;
  }
}
