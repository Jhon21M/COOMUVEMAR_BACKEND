import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsUUID,
} from 'class-validator';
import { IsBufferString } from 'src/common/Dto/dto.Buffer';

export class CreateDocumentoDto {
  @IsOptional()
  @ApiProperty()
  @IsString()
  declaracion: string;

  //@IsFile()
  @IsNotEmpty()
  @IsString()
  //@MaxFileSize(3000)
  //@HasMimeType(['image/jpeg', 'image/png', 'image/jpg'])
  @ApiProperty({ required: false, nullable: true })
  ImgCedula: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true })
  DOCDictamenFinal: string;

  @IsNotEmpty()
  @IsString() 
  @ApiProperty({ required: true })
  IDFicha: string;
}
