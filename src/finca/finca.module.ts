import { Module } from '@nestjs/common';
import { FincaService } from './finca.service';
import { FincaController } from './finca.controller';

@Module({
  controllers: [FincaController],
  providers: [FincaService],
})
export class FincaModule {}
