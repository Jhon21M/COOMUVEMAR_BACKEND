import { Module } from '@nestjs/common';
import { DatoService } from './dato.service';
import { DatoController } from './dato.controller';

@Module({
  controllers: [DatoController],
  providers: [DatoService]
})
export class DatoModule {}
