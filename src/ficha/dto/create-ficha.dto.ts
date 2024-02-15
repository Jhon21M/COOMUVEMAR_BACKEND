import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsOptional,
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
  IsEmail,
  IsDate,
  IsNumber,
} from 'class-validator';

export class CreateFichaDto {
  @IsDate()
  @Transform(({ value }) => (value instanceof Date ? value : new Date(value)))
  @IsOptional()
  @ApiProperty({ nullable: true })
  createdAt: Date;

  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  @ApiProperty()
  localizacion: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true })
  IDTrabajador: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true })
  IDFinca: number;
}
