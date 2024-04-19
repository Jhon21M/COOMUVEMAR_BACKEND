import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTrabajadorProductorDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  IDProductor: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  IDTranajador: string;
}
