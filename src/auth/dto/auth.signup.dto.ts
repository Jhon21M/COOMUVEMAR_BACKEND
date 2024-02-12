import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
} from 'class-validator';

export class AuthSignupDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  nombre: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: false })
  apellido: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: false })
  telefono: string;

  @IsOptional()
  @IsUrl()
  @ApiProperty({ required: false })
  url: string;

  @IsNotEmpty()
  @ApiProperty({ required: true, example: 'example@gmail.com' })
  @IsEmail({}, { message: 'La dirección de correo electrónico no es válida.' })
  @Length(14)
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-z]{5,}\.[a-z]{3,}$/, {
    message: 'El formato del correo electrónico no es válido.',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  password: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  @IsEnum(Role, {
    message:
      'El valor del role proporcionado no es válido. Debe ser USER o ADMIN.',
  })
  role: Role;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  IDTrabajador: string;
}
