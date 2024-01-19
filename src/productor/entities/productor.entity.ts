import { ApiProperty } from '@nestjs/swagger';
import { Productor } from '@prisma/client';
import { Transform } from 'class-transformer';
import { number } from 'joi';

export class EntityProductor implements Productor {
  @ApiProperty()
  id: number | null;

  @ApiProperty()
  nombre: string;

  @ApiProperty()
  apellido: string;

  @ApiProperty({ required: false, nullable: true })
  numeroCedula: string;

  @ApiProperty({ required: false, nullable: true })
  numeroTelefono: string | null;

  @ApiProperty({ required: false, nullable: true })
  fechaIngresoPrograma: Date | null;

  @Transform(({ value }) => value.toNumber()) // ejemplo del uso de tansform, para mostrar datos hacia el usuario
  @ApiProperty({ type: number })
  estado: number;

  constructor(partial: Partial<EntityProductor>) {
    Object.assign(this, partial);
  }
}
