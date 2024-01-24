import { ApiProperty } from '@nestjs/swagger';
import { seccionesFichaInterface } from 'src/sec-ficha/interfaces';

export class EntitySeccionFicha implements seccionesFichaInterface {
  @ApiProperty({ required: true, nullable: false })
  nombre: string;

  @ApiProperty({ required: true, nullable: false })
  descripcion: string;

  constructor(partial: Partial<EntitySeccionFicha>) {
    Object.assign(this, partial);
  }
}
