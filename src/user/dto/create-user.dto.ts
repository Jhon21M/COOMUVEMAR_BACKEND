import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsNotEmpty,
  IsString,
  IsNumber,
  Length,
  IsEmail,
  Matches,
  IsEnum,
} from 'class-validator';
import { Role } from 'src/common/enum/role.enum';

export class CreateUserDto {
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
  @ApiProperty({ required: true, example: '123456' })
  hash: string;

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
  @ApiProperty({ required: false })
  IDTrabajador: number;
}
