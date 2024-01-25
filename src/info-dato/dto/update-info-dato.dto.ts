import { PartialType } from '@nestjs/swagger';
import { CreateInfoDatoDto } from './create-info-dato.dto';

export class UpdateInfoDatoDto extends PartialType(CreateInfoDatoDto) {}
