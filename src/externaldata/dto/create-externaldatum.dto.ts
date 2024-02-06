import { ApiProperty } from '@nestjs/swagger';
import {
  Dato,
  Ficha,
  Finca,
  InformacionDato,
  SeccionesFicha,
} from '@prisma/client';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class CreateExternaldataDto {
  ficha: Ficha[];

  InformacionDato: InformacionDato[];

  @IsOptional()
  finca: Finca[];
}
