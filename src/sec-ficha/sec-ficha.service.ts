import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EntitySeccionFicha, EntityUpdateSeccionFicha } from './entities';

@Injectable()
export class SecFichaService {
  constructor(private prisma: PrismaService) {}

  async create(seccionficha: EntitySeccionFicha): Promise<EntitySeccionFicha> {
    const newSeccionFicha = await this.prisma.seccionesFicha.create({
      data: {
        ...seccionficha,
      },
    });

    return newSeccionFicha;
  }

  async findAll() {
    return await this.prisma.seccionesFicha.findMany();
  }

  findOne(id: number) {
    return this.prisma.seccionesFicha.findUnique({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
    });
  }

  async update(
    id: number,
    seccionficha: EntityUpdateSeccionFicha,
  ): Promise<EntitySeccionFicha> {
    return await this.prisma.seccionesFicha.update({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
      data: {
        ...seccionficha,
      },
    });
  }

  remove(id: number) {
    return this.prisma.seccionesFicha.delete({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
    });
  }
}
