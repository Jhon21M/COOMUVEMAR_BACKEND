import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
  IsEmail,
} from 'class-validator';

export class CreateInspectorDto {
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

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  urlImg: string;

}
