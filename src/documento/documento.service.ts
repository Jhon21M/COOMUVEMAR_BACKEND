import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EntityDocumento, EntityUpdateDocumento } from './entities';

@Injectable()
export class DocumentoService {
  constructor(private prisma: PrismaService) {}

  async create(dato: EntityDocumento): Promise<EntityDocumento> {
    try {
      const newdocumento = await this.prisma.documento.create({
        data: {
          ...dato,
        },
      });

      return newdocumento;
    } catch (error) {
      console.error('ah! algo salio mal:', error);
      throw new Error('ah! algo salio mal!');
    }
  }

  async findAll() {
    return await this.prisma.documento.findMany();
  }

  findOne(id: number) {
    return this.prisma.documento.findUnique({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
    });
  }

  async update(
    id: number,
    documento: EntityUpdateDocumento,
  ): Promise<EntityUpdateDocumento> {
    return await this.prisma.documento.update({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
      data: {
        ...documento,
      },
    });
  }

  remove(id: number) {
    return this.prisma.documento.delete({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
      select: {
        id: true,
      },
    });
  }
}
