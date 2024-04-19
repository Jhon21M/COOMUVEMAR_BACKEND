import { Module } from '@nestjs/common';
import { GoogleService } from './upload-google.service'; 

@Module({
  providers: [GoogleService],
  exports: [GoogleService], 
})
export class GoogleModule {}
