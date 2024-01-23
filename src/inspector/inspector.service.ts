import { Injectable } from '@nestjs/common';
import { UpdateInspectorDto } from './dto/update-inspector.dto';
import { EntityInspector } from './entities';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InspectorService {
  constructor(private prisma: PrismaService){}
  async create(inspector: EntityInspector): Promise<EntityInspector> {
    const newInspector = await this.prisma.inspector.create({
      data: {
        ...inspector,
      },
    });

    return newInspector;
  }
  async findAll() {
    return await this.prisma.inspector.findMany();
  }

  findOne(id: number) {
    return this.prisma.inspector.findUnique({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
    });
  }

  async update(
    id: number,
    inspector: EntityInspector,
  ): Promise<EntityInspector> {
    return await this.prisma.inspector.update({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
      data: {
        ...inspector,
      },
    });
  }

  remove(id: number) {
    return this.prisma.inspector.delete({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
    });
  }
}
