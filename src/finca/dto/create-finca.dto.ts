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
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true })
  id: number;

  @IsString()
  @IsNotEmpty()
  @Length(3, 40)
  @ApiProperty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 40)
  @ApiProperty()
  apellido: string;

  @IsString()
  @IsOptional()
  @Length(16)
  @ApiProperty({ required: false })
  numeroCedula: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @MinLength(8)
  numeroTelefono: string;

  @IsOptional()
  @IsDate()
  @ApiProperty({ required: false })
  fechaIngresoPrograma: Date;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  estado: number;
}
