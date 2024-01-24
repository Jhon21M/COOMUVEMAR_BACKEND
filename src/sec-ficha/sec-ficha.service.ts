import { Injectable } from '@nestjs/common';
import { CreateSecFichaDto } from './dto/create-sec-ficha.dto';
import { UpdateSecFichaDto } from './dto/update-sec-ficha.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SecFichaService {
  constructor(private prisma: PrismaService) {}

  async create(ficha: EntityFicha): Promise<EntityFicha> {
    const newFicha = await this.prisma.ficha.create({
      data: {
        ...ficha,
      },
    });

    return newFicha;
  }

  async findAll() {
    return await this.prisma.ficha.findMany();
  }

  findOne(id: number) {
    return this.prisma.ficha.findUnique({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
    });
  }

  async update(id: number, ficha: EntityUpdateFicha): Promise<EntityFicha> {
    return await this.prisma.ficha.update({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
      data: {
        ...ficha,
      },
    });
  }

  remove(id: number) {
    return this.prisma.ficha.delete({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
    });
  }
}
