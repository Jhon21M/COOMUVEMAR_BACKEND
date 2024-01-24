import { Injectable } from '@nestjs/common';
import { CreateSecFichaDto } from './dto/create-sec-ficha.dto';
import { UpdateSecFichaDto } from './dto/update-sec-ficha.dto';

@Injectable()
export class SecFichaService {
  create(createSecFichaDto: CreateSecFichaDto) {
    return 'This action adds a new secFicha';
  }

  findAll() {
    return `This action returns all secFicha`;
  }

  findOne(id: number) {
    return `This action returns a #${id} secFicha`;
  }

  update(id: number, updateSecFichaDto: UpdateSecFichaDto) {
    return `This action updates a #${id} secFicha`;
  }

  remove(id: number) {
    return `This action removes a #${id} secFicha`;
  }
}
