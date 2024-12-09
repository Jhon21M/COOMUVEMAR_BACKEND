import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateInsumoDto {
  @IsNotEmpty()
  @IsString({ message: 'El campo producto_aplicado debe ser de tipo string' })
  @ApiProperty({ required: true })
  producto_aplicado: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  tipo: string | null;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  descripcion: string | null;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false })
  permitido: boolean | null;
}
