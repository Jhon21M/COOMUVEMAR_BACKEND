import { ApiProperty } from '@nestjs/swagger';
import { number } from 'joi';
import { UserInterface } from '../interfaces';
import { Role } from '@prisma/client';

export class EntityUser implements UserInterface {
  @ApiProperty()
  email: string;

  @ApiProperty()
  hash: string;

  @ApiProperty({ required: true, nullable: false })
  role: Role;

  @ApiProperty({ type: number })
  IDTrabajador: number;

  constructor(partial: Partial<EntityUser>) {
    Object.assign(this, partial);
  }
}
