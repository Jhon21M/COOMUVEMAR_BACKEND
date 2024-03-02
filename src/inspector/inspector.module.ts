import { Module } from '@nestjs/common';
import { InspectorService } from './inspector.service';
import { InspectorController } from './inspector.controller';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [NestjsFormDataModule],
  controllers: [InspectorController],
  providers: [InspectorService]
})
export class InspectorModule {}
