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
  
  @IsDate()
  @Transform(({ value }) => (value instanceof Date ? value : new Date(value)))
  @IsOptional()
  @ApiProperty({ nullable: false })
  fechaInicio: Date;

  @IsDate()
  @Transform(({ value }) => (value instanceof Date ? value : new Date(value)))
  @IsOptional()
  @ApiProperty({ nullable: false })
  fechaFinal: Date;
}
