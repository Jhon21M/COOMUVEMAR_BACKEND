import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateSeccionFichaDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 40)
  @ApiProperty({ required: true })
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 40)
  @ApiProperty({ required: true })
  descripcion: string;
}
