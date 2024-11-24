import { Module } from '@nestjs/common';
import { FichaService } from './ficha.service';
import { FichaController } from './ficha.controller';
import { DocumentoModule } from 'src/documento/documento.module';

@Module({
  imports: [DocumentoModule],
  controllers: [FichaController],
  providers: [FichaService],
})
export class FichaModule {}
