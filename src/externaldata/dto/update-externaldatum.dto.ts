import { PartialType } from '@nestjs/swagger';
import { CreateExternaldataDto } from './create-externaldatum.dto';

export class UpdateExternaldatumDto extends PartialType(CreateExternaldataDto) {}
