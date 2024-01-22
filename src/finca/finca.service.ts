import { Injectable } from '@nestjs/common';
import { CreateFincaDto } from './dto/create-finca.dto';
import { UpdateFincaDto } from './dto/update-finca.dto';

@Injectable()
export class FincaService {
  create(createFincaDto: CreateFincaDto) {
    return 'This action adds a new finca';
  }

  findAll() {
    return `This action returns all finca`;
  }

  findOne(id: number) {
    return `This action returns a #${id} finca`;
  }

  update(id: number, updateFincaDto: UpdateFincaDto) {
    return `This action updates a #${id} finca`;
  }

  remove(id: number) {
    return `This action removes a #${id} finca`;
  }
}
