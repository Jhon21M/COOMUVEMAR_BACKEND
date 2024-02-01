import { ApiProperty } from '@nestjs/swagger';
import { UserInterface } from 'src/auth/interfaces';

export class EntityAuthSignin implements Partial<UserInterface> {

  @ApiProperty({ required: true, nullable: false })
  email: string;

  @ApiProperty({ required: true, nullable: false })
  password: string;

  constructor(partial: Partial<EntityAuthSignin>) {
    Object.assign(this, partial);
  }
}
