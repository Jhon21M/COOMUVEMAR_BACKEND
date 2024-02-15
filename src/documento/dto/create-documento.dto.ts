import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
import { IsBufferString } from 'src/common/Dto/dto.Buffer';

export class CreateDocumentoDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  declaracion: string;

  //@IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  @IsBufferString()
  huella: Buffer;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true })
  DOCDictamenFinal: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true })
  IDFicha: number;
}
