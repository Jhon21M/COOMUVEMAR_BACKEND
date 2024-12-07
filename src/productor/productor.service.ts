import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EntityUpdateProductor, EntityProductor } from './entities';

@Injectable()
export class ProductorService {
  constructor(private prisma: PrismaService) {}
  async create(productor: EntityProductor): Promise<EntityProductor> {
    try {
      console.log('Creando productor:', productor);
      const newProductor = await this.prisma.productor.create({
        data: {
          ...productor,
        },
      });

      return newProductor;
    } catch (error) {
      console.log(error);
      throw new ForbiddenException({
        message: 'Error al crear Productor',
        error: error.message,
      });
    }
  }

  findAll() {
    return this.prisma.productor.findMany();
  }

  findAllFincaOneProductor(id: number) {
    return this.prisma.productor.findMany({
      where: {
        id: id,
      },
      include: {
        Finca: true,
      },
    });
  }

  findAllProductorAndFinca() {
    return this.prisma.productor.findMany({
      include: {
        Finca: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.productor.findUnique({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
    });
  }

  async update(
    id: number,
    productor: EntityUpdateProductor,
  ): Promise<EntityProductor> {
    return await this.prisma.productor.update({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
      data: {
        ...productor,
      },
    });
  }

  remove(id: number) {
    return this.prisma.productor.delete({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
    });
  }
}
