import { PartialType } from '@nestjs/swagger';
import { CreateSeccionFichaDto } from './create-sec-ficha.dto';

export class UpdateSecFichaDto extends PartialType(CreateSeccionFichaDto) {}
