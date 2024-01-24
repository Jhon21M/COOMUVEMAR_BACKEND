import { Module } from '@nestjs/common';
import { SecFichaService } from './sec-ficha.service';
import { seccionesFichaController } from './sec-ficha.controller';

@Module({
  controllers: [seccionesFichaController],
  providers: [SecFichaService]
})
export class SecFichaModule {}
