import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { matchRoles } from 'src/auth/util';
import { Request } from 'express';
import { AuthInterface } from '../interfaces';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const rolesRequired = this.reflector.get<string[]>(
      'roles',
      ctx.getHandler(),
    );
    if (!rolesRequired) {
      return true; // Si no se especifican roles, permitir el acceso
    }
    const request = ctx.switchToHttp().getRequest<Request>();
    const userInfo = request.user as AuthInterface;
    if (userInfo) {
      //Verificar si el usuario tiene al menos uno de los roles requeridos
      return matchRoles(rolesRequired, userInfo.role);
    }
    return true;
  }
}
