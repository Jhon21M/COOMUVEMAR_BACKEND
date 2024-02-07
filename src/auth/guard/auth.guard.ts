import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { matchRoles } from 'src/auth/util';
import { Request } from 'express';
import { UserInterface } from '../interfaces';

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
    const userInfo = request.user as UserInterface;
    console.log(userInfo);
    if (userInfo) {
      console.log('imprimiendo request del user', userInfo);
      //Verificar si el usuario tiene al menos uno de los roles requeridos
      return matchRoles(rolesRequired, userInfo.role);
    } else {
      console.log('El objeto user es indefinido');
    }
    return true;


  }
}
