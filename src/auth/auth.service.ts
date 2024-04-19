import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EntityAuth } from './entities';
import { EntityAuthSignin } from './entities/signin.entity';
import { Role, Usuario } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async singup(authSignup: EntityAuth): Promise<{ access_token: string }> {
    //generate the password hash
    const hash = await argon.hash(authSignup.password);
    try {
      //add the new Trabajador to the db
      const newTrabajador = await this.prisma.trabajador.create({
        data: {
          nombre: authSignup.nombre,
          apellido: authSignup.apellido,
          numeroTelefono: authSignup.numeroTelefono,
          urlImg: authSignup.urlImg,
        },
      });

      const newUser = await this.prisma.usuario.create({
        data: {
          email: authSignup.email,
          hash,
          role: authSignup.role,
          IDTrabajador: newTrabajador.id,
        },
      });

      return this.signToken(newUser.role, newUser.id, newUser.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already in use');
        }
      }
      throw error;
    }
  }

  async signin(
    userAuthSignin: EntityAuthSignin,
  ): Promise<{ access_token: string }> {
    const { email, password } = userAuthSignin;
    console.log(
      'hora:' +
        new Date().getHours().toString() +
        ':' +
        new Date().getMinutes().toString(),
    );
    console.log('imprimiento email: ', email);
    console.log('imprimiento password: ', password);

    // find the user by email
    const user = await this.prisma.usuario.findUnique({
      where: {
        email: userAuthSignin.email,
      },
    });

    // if user does not exist throw exception
    if (!user) throw new ForbiddenException('Incorrect credentials');

    //compare the password
    const pwMatches = await argon.verify(user.hash, userAuthSignin.password);

    // if password incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Incorrect credentials');

    //send back the user
    return this.signToken(user.role, user.id, user.email);
  }

  async signToken(
    role: string,
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    if (role === 'ADMIN') {
      const payload = {
        sub: userId,
        email,
      };
      const secret = this.config.get('JWT_SECRET');

      const token = await this.jwt.signAsync(payload, {
        expiresIn: '3h',
        secret,
      });

      return {
        access_token: token,
      };
    } else {
      const payload = {
        sub: userId,
        email,
      };
      const secret = this.config.get('JWT_SECRET');

      const token = await this.jwt.signAsync(payload, {
        expiresIn: '60s',
        secret,
      });
      return {
        access_token: token,
      };
    }
  }

  async signinMovil(userAuthSignin: EntityAuthSignin): Promise<any> {
    const { email, password } = userAuthSignin;
    console.log(
      'hora:' +
        new Date().getHours().toString() +
        ':' +
        new Date().getMinutes().toString(),
    );
    console.log('imprimiento email: ', email);
    console.log('imprimiento password: ', password);

    // find the user by email
    const user = await this.prisma.usuario.findUnique({
      where: {
        email: userAuthSignin.email,
      },
    });

    // if user does not exist throw exception
    if (!user) throw new ForbiddenException('Incorrect credentials');

    //compare the password
    const pwMatches = await argon.verify(user.hash, userAuthSignin.password);

    // if password incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Incorrect credentials');

    const trabajador = await this.prisma.trabajador.findUnique({
      where: {
        id: user.IDTrabajador,
      },
      select: {
        id: true,
        nombre: true,
        apellido: true,
      },
    });
    const role = user.role;
    //send back the user
    const access_token = await this.signToken(user.role, user.id, user.email);

    return {
      trabajador: trabajador,
      role: role,
      access_token: access_token.access_token,
    };
  }

  signout() {}
}
