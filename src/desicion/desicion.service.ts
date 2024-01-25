import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EntityDesicion, EntityUpdateDesicion } from './entities';

@Injectable()
export class DesicionService {
  constructor(private prisma: PrismaService) {}

  async create(desicion: EntityDesicion): Promise<EntityDesicion> {
    try {
      const newDesicion = await this.prisma.desicion.create({
        data: {
          ...desicion,
        },
      });

      return newDesicion;
    } catch (error) {
      console.error('ah! algo salio mal:', error);
      throw new Error('ah! algo salio mal!');
    }
  }

  async findAll() {
    return await this.prisma.desicion.findMany();
  }

  findOne(id: number) {
    return this.prisma.desicion.findUnique({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
    });
  }

  async update(
    id: number,
    desicion: EntityUpdateDesicion,
  ): Promise<EntityUpdateDesicion> {
    return await this.prisma.desicion.update({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
      data: {
        ...desicion,
      },
    });
  }

  remove(id: number) {
    return this.prisma.desicion.delete({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
      select: {
        id: true,
      },
    });
  }
}
