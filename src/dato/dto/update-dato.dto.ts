import { PartialType } from '@nestjs/swagger';
import { CreateDatoDto } from './create-dato.dto';

export class UpdateDatoDto extends PartialType(CreateDatoDto) {}
