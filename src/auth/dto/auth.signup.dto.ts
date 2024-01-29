import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class AuthSignupDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: false })
  lastName: string;

  @IsNotEmpty()
  @ApiProperty({ required: true, example: 'jhoe@gmail.com' })
  @IsEmail({}, { message: 'La dirección de correo electrónico no es válida.' })
  @Length(14)
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-z]{5,}\.[a-z]{3,}$/, {
    message: 'El formato del correo electrónico no es válido.',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  hash: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  role: Role;
}
