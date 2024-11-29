import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateInfoDatoDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  id: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  informacion: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true })
  descripcion: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  IDDato: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  IDFicha: string;
}
