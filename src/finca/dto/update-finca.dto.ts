import { PartialType } from '@nestjs/swagger';
import { CreateFincaDto } from './create-finca.dto';

export class UpdateFincaDto extends PartialType(CreateFincaDto) {}
