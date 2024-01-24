import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  isNotEmpty,
} from 'class-validator';

export class CreateDatoDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  titulo: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  descripcion: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  IDSeccionFicha: number;
}
