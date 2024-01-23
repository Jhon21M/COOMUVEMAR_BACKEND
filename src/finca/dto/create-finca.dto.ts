import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDate,
  Length,
  MinLength,
} from 'class-validator';

export class CreateFincaDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @Length(3, 40)
  @ApiProperty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 40)
  @ApiProperty()
  comunidad: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  areaCacaoProduccion: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  areaCacaoDesarrollo: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  produccionUltimoSiclo: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true })
  IDProductor: number;
}
