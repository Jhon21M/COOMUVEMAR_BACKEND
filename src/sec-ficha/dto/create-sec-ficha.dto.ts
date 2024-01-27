import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateSeccionFichaDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 50)
  @ApiProperty({ required: true })
  nombre: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  descripcion: string;
}
