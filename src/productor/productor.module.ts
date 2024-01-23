import { Module } from '@nestjs/common';
import { ProductorService } from './productor.service';
import { ProductorController } from './productor.controller';

@Module({
  controllers: [ProductorController],
  providers: [ProductorService],
})
export class ProductorModule {}
