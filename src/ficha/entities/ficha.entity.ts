import { ApiProperty } from '@nestjs/swagger';
import { FichaInterface } from 'src/ficha/interfaces';

export class EntityFicha implements FichaInterface {
  @ApiProperty({ required: false, nullable: true })
  createdAT?: Date | null;

  @ApiProperty({ required: true, nullable: false })
  localizacion: string;

  @ApiProperty({ required: true, nullable: false })
  IDInspector: number;

  constructor(partial: Partial<EntityFicha>) {
    Object.assign(this, partial);
  }
}
