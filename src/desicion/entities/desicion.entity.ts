import { ApiProperty } from '@nestjs/swagger';

export class EntityDesicion {
  @ApiProperty({ required: true, nullable: false })
  desicion: string;

  @ApiProperty({ required: false, nullable: true })
  descripcion: string;

  @ApiProperty({ required: true, nullable: false })
  IDFicha: string;

  constructor(partial: Partial<EntityDesicion>) {
    Object.assign(this, partial);
  }
}
