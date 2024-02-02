import { ApiProperty } from '@nestjs/swagger';
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
  IDInspector: number;
}
