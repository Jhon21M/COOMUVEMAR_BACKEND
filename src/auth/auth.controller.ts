import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignupDto, AuthSigninDto } from './dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth - API')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Create a account on DB' })
  signup(@Body() dto: AuthSignupDto) {
    return this.authService.singup(dto);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Login with an account' })
  signin(@Body() dto: AuthSigninDto) {
    return this.authService.signin(dto);
  }

  @Get('signout')
  @ApiOperation({ summary: 'Get out From the session online' })
  signout() {
    return this.authService.signout();
  }
}
