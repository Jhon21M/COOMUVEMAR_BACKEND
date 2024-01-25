import { Injectable } from '@nestjs/common';
import { CreateInfoDatoDto } from './dto/create-info-dato.dto';
import { UpdateInfoDatoDto } from './dto/update-info-dato.dto';

@Injectable()
export class InfoDatoService {
  create(createInfoDatoDto: CreateInfoDatoDto) {
    return 'This action adds a new infoDato';
  }

  findAll() {
    return `This action returns all infoDato`;
  }

  findOne(id: number) {
    return `This action returns a #${id} infoDato`;
  }

  update(id: number, updateInfoDatoDto: UpdateInfoDatoDto) {
    return `This action updates a #${id} infoDato`;
  }

  remove(id: number) {
    return `This action removes a #${id} infoDato`;
  }
}
