import { PartialType } from '@nestjs/swagger';
import { CreateDesicionDto } from './create-desicion.dto';

export class UpdateDesicionDto extends PartialType(CreateDesicionDto) {}
