import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class AuthSigninDto {
  @IsNotEmpty()
  @ApiProperty({ required: true, example: 'u_admin@gmail.com' })
  @IsEmail()
  @Length(14)
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'El formato del correo electrónico no es válido.',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, example: '12345678' })
  password: string;
}
