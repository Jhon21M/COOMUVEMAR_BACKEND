import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
  IsEmail,
} from 'class-validator';

export class CreateProductorDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  @ApiProperty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  @ApiProperty()
  apellido: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  numeroTelefono: string;

  @IsOptional()
  @ApiProperty({ required: false, type: IsEmail })
  @MinLength(8)
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  password: string;
}
