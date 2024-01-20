import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthSigninDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ required: true, example: 'jhoe@gmail.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, example: 'hkQjS0q((?aSc' })
  password: string;
}
