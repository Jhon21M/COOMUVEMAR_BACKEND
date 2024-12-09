import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsOptional,
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsArray,
} from 'class-validator';

export class CreateManejoResiduoDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  tipoResiduo: string;

  @IsOptional()
  @IsString()
  @IsArray()
  @ApiProperty({ required: false })
  nuevoBuenManejo: string[] | null;

  @IsOptional()
  @IsString()
  @IsArray()
  @ApiProperty({ required: false })
  nuevoMalManejo: string[] | null;
}
