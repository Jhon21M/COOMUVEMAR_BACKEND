import { Injectable } from '@nestjs/common';
import { CreateExternaldatumDto } from './dto/create-externaldatum.dto';
import { UpdateExternaldatumDto } from './dto/update-externaldatum.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExternaldataService {
  constructor(private prisma: PrismaService){}

  async create(ficha: any): Promise<any> {
    const newFicha = await this.prisma.ficha.create({
      data: {
        ...ficha,
      },
    });

    return newFicha;

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
