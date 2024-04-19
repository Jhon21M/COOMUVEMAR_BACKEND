import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EntityInfoDato } from './entities';
import { EntityUpdateInfoDato } from './entities/update.info.dato.entity';

@Injectable()
export class InfoDatoService {
  constructor(private prisma: PrismaService) {}

  async create(dato: EntityInfoDato): Promise<EntityInfoDato> {
    try {
      const newInforDato = await this.prisma.informacionDato.create({
        data: {
          ...dato,
        },
      });

      return newInforDato;
    } catch (error) {
      console.error('ah! algo salio mal:', error);
      throw new Error('aggh!');
    }
  }

  async findAll() {
    return await this.prisma.informacionDato.findMany();
  }

  findOne(id: number) {
    return this.prisma.informacionDato.findUnique({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
    });
  }

  findAllInfoOneFicha(id: number) {
    return this.prisma.informacionDato.findMany({
      where: {
        IDFicha: typeof id === 'number' ? id : Number.parseInt(id),
      },
    });
  }

  async update(
    id: number,
    informacion: EntityUpdateInfoDato,
  ): Promise<EntityUpdateInfoDato> {
    return await this.prisma.informacionDato.update({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
      data: {
        ...informacion,
      },
    });
  }

  remove(id: number) {
    return this.prisma.informacionDato.delete({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
    });
  }
}
