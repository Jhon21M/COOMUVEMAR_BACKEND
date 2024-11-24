import { ApiProperty } from '@nestjs/swagger';
import { number } from 'joi';
import { FincaInterface } from 'src/finca/interfaces';

export class EntityFinca implements FincaInterface {
  @ApiProperty()
  nombre: string;

  @ApiProperty()
  comunidad: string;

  @ApiProperty({ required: false, nullable: true })
  areaCacaoProduccion: string;

  @ApiProperty({ required: false, nullable: true })
  areaCacaoDesarrollo: string;

  @ApiProperty({ required: false, nullable: true })
  produccionUltimoSiclo: string | null;

  @ApiProperty({ required: false, nullable: true })
  estimadoCosecha: string | null;

  @ApiProperty({ required: false, nullable: false, type: number })
  IDProductor: number;

  constructor(partial: Partial<EntityFinca>) {
    Object.assign(this, partial);
  }
}
