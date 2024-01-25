import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EntityDato, EntityUpdateDato } from './entities';

@Injectable()
export class DatoService {
  constructor(private prisma: PrismaService) {}

  async create(dato: EntityDato): Promise<EntityDato> {
    try {
      const newDato = await this.prisma.dato.create({
        data: {
          ...dato,
        },
      });

      return newDato;
    } catch (error) {
      // Manejo de errores, por ejemplo, puedes loguear el error
      console.error('ah! algo salio mal:', error);
      throw new Error('aggh!');
    }
  }

  async findAll() {
    return await this.prisma.dato.findMany();
  }

  findOne(id: number) {
    return this.prisma.dato.findUnique({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
    });
  }

  async update(id: number, ficha: EntityUpdateDato): Promise<EntityUpdateDato> {
    return await this.prisma.dato.update({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
      data: {
        ...ficha,
      },
    });
  }

  remove(id: number) {
    return this.prisma.dato.delete({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
    });
  }
}
