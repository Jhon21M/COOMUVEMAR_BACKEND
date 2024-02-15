import { ApiProperty } from '@nestjs/swagger';
import { InspectorInterface } from 'src/inspector/interfaces';

export class EntityInspector implements InspectorInterface {
  @ApiProperty()
  nombre: string;

  @ApiProperty()
  apellido: string;

  @ApiProperty({ required: false, nullable: true })
  numeroTelefono: string | null;

  @ApiProperty({ required: false, nullable: true })
  urlImg: string | null;

  constructor(partial: Partial<EntityInspector>) {
    Object.assign(this, partial);
  }
}
