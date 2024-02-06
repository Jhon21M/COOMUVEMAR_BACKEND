import { PartialType } from '@nestjs/swagger';
import { CreateExternaldatumDto } from './create-externaldatum.dto';

export class UpdateExternaldatumDto extends PartialType(CreateExternaldatumDto) {}
