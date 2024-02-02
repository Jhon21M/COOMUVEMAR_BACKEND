import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsOptional,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDate,
  Length,
  MinLength,
} from 'class-validator';

export class CreateProductorDto {
  // @IsNotEmpty()
  // @IsNumber()
  // @ApiProperty({ required: true })
  // id: number;

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
  @Transform(({ value }) => (value instanceof Date ? value : new Date(value)))
  @ApiProperty()
  fechaIngresoPrograma: Date;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  estado: number;
}
