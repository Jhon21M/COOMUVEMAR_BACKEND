import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTrabajadorProductorDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  IDProductor: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  IDTrabajador: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  estadoInspeccion: string;
}
