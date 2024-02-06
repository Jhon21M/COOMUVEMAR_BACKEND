import { Ficha, Finca, InformacionDato } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsNegative, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CreateInfoDatoDto } from 'src/info-dato/dto';
import { CreateFichaDto } from 'src/ficha/dto';
import { CreateFincaDto } from 'src/finca/dto';
import { Public } from '@prisma/client/runtime/library';
import { create } from 'domain';

// Define una interfaz que extiende los DTOs existentes con la propiedad 'id'
export class FichaWithID extends CreateFichaDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;
}

export class InformacionDatoWithID extends CreateInfoDatoDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;
}

export class FincaWithID extends CreateFincaDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;
}

export class CreateExternaldataDto {
  @ApiProperty({ type: () => FichaWithID, isArray: true })
  ficha: Ficha[];

  @ApiProperty({ type: () => InformacionDatoWithID, isArray: true })
  InformacionDato: InformacionDato[];

  @IsOptional()
  @ApiProperty({ type: () => FincaWithID, isArray: true })
  finca: Finca[];
}
