import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';
import { InspectorInterface } from 'src/inspector/interfaces';

export class EntityInspector implements InspectorInterface {
  @ApiProperty()
  nombre: string;

  @ApiProperty()
  apellido: string;

  @ApiProperty({ required: false, nullable: true })
  numeroTelefono: string | null;

  @ApiProperty({ required: true, nullable: false, type: IsEmail })
  email: string;

  @ApiProperty({ required: true, nullable: false, type: IsStrongPassword })
  password: string;

  constructor(partial: Partial<EntityInspector>) {
    Object.assign(this, partial);
  }
}
