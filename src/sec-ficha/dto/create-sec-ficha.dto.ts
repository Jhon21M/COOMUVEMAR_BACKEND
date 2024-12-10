import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateSeccionFichaDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false })
  id: number;

  @IsString()
  @IsNotEmpty()
  @Length(5, 50)
  @ApiProperty({ required: true })
  nombre: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  descripcion: string;
}
