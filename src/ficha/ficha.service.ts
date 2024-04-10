import { Injectable } from '@nestjs/common';
import { EntityFicha, EntityUpdateFicha } from './entities';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FichaService {
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

  async findOneData(id: number) {
    try {
      return await this.prisma.ficha.findUnique({
        where: {
          id: typeof id === 'number' ? id : Number.parseInt(id),
        },
        include: {
          InformacionDato: {
            include: {
              dato: {
                include: {
                  seccionesFicha: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      console.error('Error en findOneData:', error);
      throw error;
    }
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

  async anasysis() {
    const ficha = await this.prisma.ficha.findMany();

    const seccionesFicha = await this.prisma.seccionesFicha.findMany();

    const preguntas = await this.prisma.dato.findMany();

    const respuestas = await this.prisma.informacionDato.findMany();

    const cantSeccion = seccionesFicha.length;

    for (let index = 0; index <= cantSeccion; index++) {}
  }
}
