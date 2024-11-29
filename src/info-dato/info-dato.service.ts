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
          id: dato.id,
          informacion: dato.informacion,
          descripcion: dato.descripcion,
          dato: {
            connect: {
              id: dato.IDDato,
            },
          },
          ficha: {
            connect: {
              id: dato.IDFicha,
            },
          },
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

  findOne(id: string) {
    return this.prisma.informacionDato.findUnique({
      where: {
        id: id,
      },
    });
  }

  findAllInfoOneFicha(id: string) {
    return this.prisma.informacionDato.findMany({
      where: {
        IDFicha: id,
      },
    });
  }

  async update(
    id: string,
    informacion: EntityUpdateInfoDato,
  ): Promise<EntityUpdateInfoDato> {
    return await this.prisma.informacionDato.update({
      where: {
        id: id,
      },
      data: {
        ...informacion,
      },
    });
  }

  remove(id: string) {
    return this.prisma.informacionDato.delete({
      where: {
        id: id,
      },
    });
  }
}
