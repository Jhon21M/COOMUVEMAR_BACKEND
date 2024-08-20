import { Ficha, Finca, InformacionDato } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateInfoDatoDto } from 'src/info-dato/dto';
import { CreateFichaDto } from 'src/ficha/dto';
import { CreateFincaDto } from 'src/finca/dto';

export class FichaWithID extends CreateFichaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
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
