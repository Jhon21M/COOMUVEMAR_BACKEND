import { Module } from '@nestjs/common';
import { InfoDatoService } from './info-dato.service';
import { InfoDatoController } from './info-dato.controller';

@Module({
  controllers: [InfoDatoController],
  providers: [InfoDatoService],
})
export class InfoDatoModule {}
