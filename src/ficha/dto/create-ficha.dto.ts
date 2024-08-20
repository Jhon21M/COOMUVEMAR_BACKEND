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
  IsJSON,
  IsBoolean,
  IsUUID,
} from 'class-validator';

export class CreateFichaDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ required: true })
  id: string;

  @IsDate()
  @Transform(({ value }) => (value instanceof Date ? value : new Date(value)))
  @IsOptional()
  @ApiProperty({ nullable: true })
  createdAt: Date;

  //@IsJSON()
  @IsNotEmpty()
  @ApiProperty()
  localizacion: {
    latitud: string;
    longitud: string;
  };

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ required: true })
  analizada: boolean;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true })
  IDTrabajador: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true })
  IDFinca: number;
}
