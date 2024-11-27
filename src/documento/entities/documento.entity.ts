import { ApiProperty } from '@nestjs/swagger';
import { DocumentoInterface } from '../interfaces';

export class EntityDocumento implements DocumentoInterface {
  @ApiProperty({ required: true, nullable: false })
  id: string;

  @ApiProperty({ required: true, nullable: false })
  declaracion: string | null;

  @ApiProperty({ required: true, nullable: false })
  ImgCedula: string;

  // @ApiProperty({ required: false, nullable: true })
  // DOCDictamenFinal: string;

  @ApiProperty({ required: true, nullable: false })
  IDFicha: string;

  constructor(partial: Partial<EntityDocumento>) {
    Object.assign(this, partial);
  }
}
