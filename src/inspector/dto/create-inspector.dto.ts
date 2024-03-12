import { ApiProperty } from '@nestjs/swagger';
import { Express } from 'express';
import {
  IsOptional,
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
  IsEmail,
} from 'class-validator';
import { HasMimeType, IsFile, MaxFileSize } from 'nestjs-form-data';

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

  //@IsFile()
  @IsOptional()
  //@MaxFileSize(3000)
  //@HasMimeType(['image/jpeg', 'image/png', 'image/jpg'])
  @ApiProperty({ required: false, nullable: true })
  urlImg: File | null;
}
