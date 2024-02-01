import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { AuthSignupDto, AuthSigninDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EntityUser } from './entities';
import { EntityAuthSignin } from './entities/signin.entity';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async singup(authSignup: EntityUser): Promise<{ access_token: string }> {
    //generate the password hash
    const hash = await argon.hash(authSignup.hash);
    try {
      //add the new user to the db
      const user = await this.prisma.usuario.create({
        data: {
          firstName: authSignup.firstName,
          lastName: authSignup.lastName,
          email: authSignup.email,
          hash,
          role: authSignup.role,
        },
      });

      return this.signToken(user.id, user.email);
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
    userAuthSingnin: EntityAuthSignin,
  ): Promise<{ access_token: string }> {
    const { email, password } = userAuthSingnin;
    console.log('imprimiento email: ', email);
    console.log('imprimiento password: ', password);

    // find the user by email
    const user = await this.prisma.usuario.findUnique({
      where: {
        email: userAuthSingnin.email,
      },
    });

    // if user does not exist throw exception
    if (!user) throw new ForbiddenException('Incorrect credentials');

    //compare the password
    const pwMatches = await argon.verify(user.hash, userAuthSingnin.password);

    // if password incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Incorrect credentials');

    //send back the user
    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
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
  }

  signout() {}
}
