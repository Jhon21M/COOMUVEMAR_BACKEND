import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RolesGuard } from 'src/auth/guard/auth.guard';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
