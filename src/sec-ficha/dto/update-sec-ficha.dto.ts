import { PartialType } from '@nestjs/swagger';
import { CreateSecFichaDto } from './create-sec-ficha.dto';

export class UpdateSecFichaDto extends PartialType(CreateSecFichaDto) {}
