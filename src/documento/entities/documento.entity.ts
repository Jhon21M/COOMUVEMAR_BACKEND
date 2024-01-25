import { ApiProperty } from '@nestjs/swagger';

export class EntityDocumento {
  @ApiProperty({ required: true, nullable: false })
  declaracion: string;

  @ApiProperty({ required: false, nullable: true })
  DOCDictamenFinal: string;

  @ApiProperty({ required: true, nullable: false })
  IDFicha: number;

  constructor(partial: Partial<EntityDocumento>) {
    Object.assign(this, partial);
  }
}
