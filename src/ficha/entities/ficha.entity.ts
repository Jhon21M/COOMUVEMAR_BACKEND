import { ApiProperty } from '@nestjs/swagger';
import { JsonValue } from '@prisma/client/runtime/library';
import { FichaInterface } from 'src/ficha/interfaces';

export class EntityFicha implements FichaInterface {
  @ApiProperty({ required: false, nullable: true })
  createdAT?: Date | null;

  @ApiProperty({ required: true, nullable: false })
  localizacion: JsonValue

  analizada: boolean;

  @ApiProperty({ required: true, nullable: false })
  IDTrabajador: number;

  @ApiProperty({ required: true, nullable: false })
  IDFinca: number;

  constructor(partial: Partial<EntityFicha>) {
    Object.assign(this, partial);
  }
}
