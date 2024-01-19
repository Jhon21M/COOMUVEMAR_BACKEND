import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductorModule } from './productor/productor.module';

@Module({
  imports: [ProductorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
