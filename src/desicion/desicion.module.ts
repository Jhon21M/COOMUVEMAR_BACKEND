import { Module } from '@nestjs/common';
import { DesicionService } from './desicion.service';
import { DesicionController } from './desicion.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [DesicionController],
  providers: [DesicionService]
})
export class DesicionModule {}
