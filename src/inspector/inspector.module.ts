import { Module } from '@nestjs/common';
import { InspectorService } from './inspector.service';
import { InspectorController } from './inspector.controller';
import { GoogleModule } from 'src/common/google_cloud/google.module';

@Module({
  imports: [GoogleModule],
  controllers: [InspectorController],
  providers: [InspectorService]
})
export class InspectorModule {}
