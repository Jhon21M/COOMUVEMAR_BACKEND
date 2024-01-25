import { Injectable } from '@nestjs/common';
import { CreateDesicionDto } from './dto/create-desicion.dto';
import { UpdateDesicionDto } from './dto/update-desicion.dto';

@Injectable()
export class DesicionService {
  create(createDesicionDto: CreateDesicionDto) {
    return 'This action adds a new desicion';
  }

  findAll() {
    return `This action returns all desicion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} desicion`;
  }

  update(id: number, updateDesicionDto: UpdateDesicionDto) {
    return `This action updates a #${id} desicion`;
  }

  remove(id: number) {
    return `This action removes a #${id} desicion`;
  }
}
