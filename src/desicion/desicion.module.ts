import { Module } from '@nestjs/common';
import { DesicionService } from './desicion.service';
import { DesicionController } from './desicion.controller';

@Module({
  controllers: [DesicionController],
  providers: [DesicionService]
})
export class DesicionModule {}
