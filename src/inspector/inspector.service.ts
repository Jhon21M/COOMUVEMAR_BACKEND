import { Injectable } from '@nestjs/common';
import { CreateInspectorDto } from './dto/create-inspector.dto';
import { UpdateInspectorDto } from './dto/update-inspector.dto';

@Injectable()
export class InspectorService {
  create(createInspectorDto: CreateInspectorDto) {
    return 'This action adds a new inspector';
  }

  findAll() {
    return `This action returns all inspector`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inspector`;
  }

  update(id: number, updateInspectorDto: UpdateInspectorDto) {
    return `This action updates a #${id} inspector`;
  }

  remove(id: number) {
    return `This action removes a #${id} inspector`;
  }
}
