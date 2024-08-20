import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDesicionDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  desicion: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true })
  descripcion: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true })
  IDFicha: string;
}
