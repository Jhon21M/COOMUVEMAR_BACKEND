import { PartialType } from '@nestjs/swagger';
import { AuthSignupDto } from 'src/auth/dto';

export class EditUserDto extends PartialType(AuthSignupDto) {}
