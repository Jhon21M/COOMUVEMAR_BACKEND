import { Documento, Ficha, InformacionDato } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateInfoDatoDto } from 'src/info-dato/dto';
import { CreateFichaDto } from 'src/ficha/dto/create_ficha_dto';
import { CreateDocumentoDto } from 'src/documento/dto';

export class FichaWithID extends CreateFichaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class DocumentoWithID extends CreateDocumentoDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: string;
}

export class CreateExternaldataDto {
  @IsNotEmpty()
  @ApiProperty({ type: () => FichaWithID, isArray: true })
  ficha: Ficha[];

  @IsNotEmpty()
  @ApiProperty({ type: () => CreateInfoDatoDto, isArray: true })
  InformacionDato: InformacionDato[];

  @IsOptional()
  //@IsNotEmpty()
  @ApiProperty({ type: () => DocumentoWithID, isArray: true })
  documento: Documento[];
}
