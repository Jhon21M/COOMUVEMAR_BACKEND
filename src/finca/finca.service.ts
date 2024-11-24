import { ForbiddenException, Injectable } from '@nestjs/common';
import { EntityFinca, EntityUpdateFinca } from 'src/finca/entities';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FincaService {
  constructor(private prisma: PrismaService) {}
  async create(Finca: EntityFinca): Promise<EntityFinca> {
    const productor = await this.prisma.productor.findUnique({
      where: {
        id: Finca.IDProductor,
      },
    });
    if (!productor) {
      throw new ForbiddenException('No existe el productor');
    }
    try {
      const newFinca = await this.prisma.finca.create({
        data: {
          nombre: Finca.nombre,

          comunidad: Finca.comunidad,

          areaCacaoProduccion: Finca.areaCacaoProduccion,

          areaCacaoDesarrollo: Finca.areaCacaoDesarrollo,

          produccionUltimoSiclo: Finca.produccionUltimoSiclo,

          estimadoCosecha: Finca.estimadoCosecha,

          productor: {
            connect: { id: Finca.IDProductor },
          },
        },
      });

      console.log('newFinca', newFinca);

      return newFinca;
    } catch (error) {
      console.error('Error al crear la finca:', error);
      throw new Error('No se pudo crear la finca');
    }
  }

  async findAll() {
    const fincas = await this.prisma.finca.findMany({
      include: {
        productor: true,
      },
    });
    console.log('inprimiendo finca', fincas);

    return fincas.map((finca) => ({
      ...finca,
      productor: finca.productor.nombre,
    }));
  }

  findOne(id: number) {
    return this.prisma.finca.findUnique({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
    });
  }

  async update(id: number, finca: EntityUpdateFinca): Promise<EntityFinca> {
    return await this.prisma.finca.update({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
      data: {
        ...finca,
      },
    });
  }

  remove(id: number) {
    return this.prisma.finca.delete({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
    });
  }
}
