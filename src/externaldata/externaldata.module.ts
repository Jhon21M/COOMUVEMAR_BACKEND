import { Module } from '@nestjs/common';
import { ExternaldataService } from './externaldata.service';
import { ExternaldataController } from './externaldata.controller';

@Module({
  controllers: [ExternaldataController],
  providers: [ExternaldataService]
})
export class ExternaldataModule {}
