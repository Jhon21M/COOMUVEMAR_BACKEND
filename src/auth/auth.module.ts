import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { UserModule } from 'src/user/user.module';
import { Roles } from './decorator';
import { RolesGuard } from './guard/auth.guard';
@Module({
  imports: [UserModule, JwtModule.register({ global: true })],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtService],
  exports: [JwtService, AuthService],
})
export class AuthModule {}
