import { Injectable } from '@nestjs/common';
import { CreateDatoDto } from './dto/create-dato.dto';
import { UpdateDatoDto } from './dto/update-dato.dto';

@Injectable()
export class DatoService {
  create(createDatoDto: CreateDatoDto) {
    return 'This action adds a new dato';
  }

  findAll() {
    return `This action returns all dato`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dato`;
  }

  update(id: number, updateDatoDto: UpdateDatoDto) {
    return `This action updates a #${id} dato`;
  }

  remove(id: number) {
    return `This action removes a #${id} dato`;
  }
}
