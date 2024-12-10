import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  isNotEmpty,
} from 'class-validator';

export class CreateDatoDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false })
  id: number;
  
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
  IDSeccionesFicha: number;
}
