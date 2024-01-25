import { ApiProperty } from '@nestjs/swagger';
import { InfoDatoInterface } from 'src/info-dato/interfaces';

export class EntityInfoDato implements InfoDatoInterface {
  @ApiProperty({ required: false, nullable: true })
  informacion: string;

  @ApiProperty({ required: false, nullable: true })
  descripcion: string;

  @ApiProperty({ required: true, nullable: false })
  IDDato: number;

  constructor(partial: Partial<EntityInfoDato>) {
    Object.assign(this, partial);
  }
}
