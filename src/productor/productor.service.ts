import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EntityProductor } from './entities/productor.entity';
import { EntityUpdateProductor } from './entities/update.productor.entity';

@Injectable()
export class ProductorService {
  constructor(private prisma: PrismaService) {}
  async create(productor: EntityProductor): Promise<EntityProductor> {
    const newProductor = await this.prisma.productor.create({
      data: {
        ...productor,
      },
    });

    return newProductor;
  }

  findAll() {
    return this.prisma.productor.findMany();
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
