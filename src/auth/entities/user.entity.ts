import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { UserInterface } from 'src/auth/interfaces';

export class EntityUser implements UserInterface {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty({ required: true, nullable: false })
  email: string;

  @ApiProperty({ required: true, nullable: false })
  hash: string;

  @ApiProperty({ required: false, nullable: true })
  role: Role | null;

  constructor(partial: Partial<EntityUser>) {
    Object.assign(this, partial);
  }
}
