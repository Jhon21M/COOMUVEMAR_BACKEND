import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { UserInterface } from 'src/auth/interfaces';

export class EntityUser implements UserInterface {
  @ApiProperty({ required: true, nullable: false })
  nombre: string;

  @ApiProperty({ required: true, nullable: false })
  apellido: string;

  @ApiProperty({ required: false, nullable: true })
  numeroTelefono: string;

  @ApiProperty({ required: false, nullable: true })
  urlImg: string;

  @ApiProperty({ required: true, nullable: false })
  email: string;

  @ApiProperty({ required: true, nullable: false })
  password: string;

  @ApiProperty({ required: false, nullable: true })
  role: Role | null;

  constructor(partial: Partial<EntityUser>) {
    Object.assign(this, partial);
  }
}
