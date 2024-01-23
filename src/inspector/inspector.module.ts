import { Module } from '@nestjs/common';
import { InspectorService } from './inspector.service';
import { InspectorController } from './inspector.controller';

@Module({
  controllers: [InspectorController],
  providers: [InspectorService]
})
export class InspectorModule {}
