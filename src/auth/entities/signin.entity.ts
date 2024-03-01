import { ApiProperty } from '@nestjs/swagger';
import { AuthInterface } from 'src/auth/interfaces';

export class EntityAuthSignin implements Partial<AuthInterface> {

  @ApiProperty({ required: true, nullable: false })
  email: string;

  @ApiProperty({ required: true, nullable: false })
  password: string;

  constructor(partial: Partial<EntityAuthSignin>) {
    Object.assign(this, partial);
  }
}
