import { Injectable } from '@nestjs/common';
import { CreateExternaldatumDto } from './dto/create-externaldatum.dto';
import { UpdateExternaldatumDto } from './dto/update-externaldatum.dto';

@Injectable()
export class ExternaldataService {
  create(createExternaldatumDto: CreateExternaldatumDto) {
    return 'This action adds a new externaldatum';
  }

  findAll() {
    return `This action returns all externaldata`;
  }

  findOne(id: number) {
    return `This action returns a #${id} externaldatum`;
  }

  update(id: number, updateExternaldatumDto: UpdateExternaldatumDto) {
    return `This action updates a #${id} externaldatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} externaldatum`;
  }
}
