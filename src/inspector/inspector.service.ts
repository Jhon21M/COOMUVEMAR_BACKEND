import { Injectable } from '@nestjs/common';
import { EntityInspector } from './entities';
import { PrismaService } from 'src/prisma/prisma.service';
import { EntityUpdateInspector } from './entities/update.productor.entity';

@Injectable()
export class InspectorService {
  constructor(private prisma: PrismaService) {}
  async create(inspector: EntityInspector): Promise<EntityInspector> {
    const newInspector = await this.prisma.trabajador.create({
      data: {
        ...inspector,
      },
    });

    return newInspector;
  }
  async findAll() {
    return await this.prisma.trabajador.findMany();
  }

  findOne(id: number) {
    return this.prisma.trabajador.findUnique({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
    });
  }

  async findOneTrabajador(id: number) {
    const user = await this.prisma.usuario.findUnique({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
    });

    return await this.prisma.trabajador.findUnique({
      where: {
        id: user.IDTrabajador,
      },
    });
  }
  async update(
    id: number,
    inspector: EntityUpdateInspector,
  ): Promise<EntityInspector> {
    return await this.prisma.trabajador.update({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
      data: {
        ...inspector,
      },
    });
  }

  remove(id: number) {
    return this.prisma.trabajador.delete({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
    });
  }
}
