import { Controller, Post, Body, Get, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignupDto, AuthSigninDto } from './dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { json } from 'body-parser';
import { Usuario } from '@prisma/client';
import { GetUser } from './decorator';

@ApiTags('Auth - API')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Create a account on DB' })
  @ApiBody({ type: AuthSignupDto })
  signup(@Body(new ValidationPipe()) dto: AuthSignupDto) {
    return this.authService.singup(dto);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Login with an account' })
  signin(@Body(new ValidationPipe()) dto: AuthSigninDto) {
    return this.authService.signin(dto);
  }
  @Post('movilsignin')
  @ApiOperation({ summary: 'Login with an account from Movil app' })
  signinMovil(@Body(new ValidationPipe()) authSignin: AuthSigninDto) {
    return this.authService.signinMovil(authSignin);
  }
  @Get('signout')
  @ApiOperation({ summary: 'Get out From the session online' })
  signout() {
    return this.authService.signout();
  }
}
