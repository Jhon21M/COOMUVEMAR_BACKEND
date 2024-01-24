import { Module } from '@nestjs/common';
import { SecFichaService } from './sec-ficha.service';
import { SecFichaController } from './sec-ficha.controller';

@Module({
  controllers: [SecFichaController],
  providers: [SecFichaService]
})
export class SecFichaModule {}
