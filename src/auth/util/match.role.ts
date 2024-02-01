import { UnauthorizedException } from '@nestjs/common';

export const matchRoles = (rolespp: string[], userRole: string) => {
  //console.log('validando roles');
  if (rolespp.includes(userRole)) {
    return true;
  } else {
    throw new UnauthorizedException(
      'No tiene permisos para realizar esta acción',
    );
  }
};

// auth/util.ts

// export function matchRoles(requiredRoles: string[], userRoles: string[]): boolean {
//     // Verifica si todos los roles requeridos están presentes en los roles del usuario
//     return requiredRoles.every(role => userRoles.includes(role));
//   }
