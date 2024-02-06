import { Module } from '@nestjs/common';
import { DatoService } from './dato.service';
import { DatoController } from './dato.controller';
import { RolesGuard } from 'src/auth/guard/auth.guard';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [DatoController],
  providers: [DatoService]
})
export class DatoModule {}
