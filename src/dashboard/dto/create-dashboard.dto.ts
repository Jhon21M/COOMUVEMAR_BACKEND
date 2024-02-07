import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  isNotEmpty,
} from 'class-validator';

export class FiltroDashDto {
  // @IsNotEmpty()
  // @ApiProperty()
  // @IsString()
  // titulo: string;

  // @IsString()
  // @IsOptional()
  // @ApiProperty()
  // descripcion: string;
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ nullable: false })
  fechaInicio: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ nullable: false })
  fechaFinal: string;
}
