import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDesicionDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  declaracion: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true })
  desicion: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true })
  IDFicha: number;
}
