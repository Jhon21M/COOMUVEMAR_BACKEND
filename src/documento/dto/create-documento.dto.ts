import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateDocumentoDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  declaracion: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true })
  DOCDictamenFinal: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true })
  IDFicha: number;
}
