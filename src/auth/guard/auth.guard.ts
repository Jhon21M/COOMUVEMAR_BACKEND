import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { matchRoles } from 'src/auth/util';
import { UserInterface } from '../interfaces';
import { UserService } from 'src/user/user.service';
import { Request } from 'express';
import { decode } from 'jsonwebtoken';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService) {}

  async canActivate(ctx: ExecutionContext): Promise<any> {
    //console.log('RolesGuard');

    const rolesm = this.reflector.get<string[]>('roles', ctx.getHandler());

    //console.log('imprimiendo roles', rolesm);
    if (!rolesm) {
      return true;
    }

    const request = ctx.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization.slice(7);

    const { sub } = decode(token);

    const userOnDB = await this.userService.findOneUserByID(Number(sub));

    //const user: Partial<UserInterface> = request.user;
    //console.log('imprimiendo usuario', userOnDB);
    //console.log(rolesm, userOnDB.role);
    return matchRoles(rolesm, userOnDB.role);
  }
}
