import { ApiProperty } from '@nestjs/swagger';
import { DatoInterface } from 'src/dato/interfaces';

export class EntityDato implements DatoInterface {
  @ApiProperty({ required: false, nullable: true })
  titulo: string;

  @ApiProperty({ required: false, nullable: true })
  descripcion: string;

  @ApiProperty({ required: true, nullable: false })
  IDSeccionesFicha: number;

  constructor(partial: Partial<EntityDato>) {
    Object.assign(this, partial);
  }
}
