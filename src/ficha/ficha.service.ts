import { Injectable } from '@nestjs/common';
import { EntityFicha, EntityUpdateFicha } from './entities';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FichaService {
  constructor(private prisma: PrismaService) {}

  async create(ficha: EntityFicha): Promise<EntityFicha> {
    const newFicha = await this.prisma.ficha.create({
      data: {
        ...ficha,
      },
    });

    return newFicha;
  }

  async findAll() {
    return await this.prisma.ficha.findMany();
  }
  async getHeader(id: number) {
    const FincaFichaID = await this.prisma.ficha.findUnique({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
      // select: {
      //   IDFinca: true,
      // },
    });

    const productorFinca = await this.prisma.finca.findUnique({
      where: {
        id: FincaFichaID.IDFinca,
      },
      // select: {
      //   IDProductor: true,
      // },
    });

    const productorData = await this.prisma.productor.findUnique({
      where: {
        id: productorFinca.IDProductor,
      },
    });

    return {
      productor: productorData.nombre + productorData.apellido,
      cedula: productorData.numeroCedula,
      telefono: productorData.numeroTelefono,
      fechaInspeccion: FincaFichaID.createdAt,
      codProductor: productorData.id,
      comunidad: productorFinca.comunidad,
      finca: productorFinca.nombre,
      produccionultimoCiclo: productorFinca.produccionUltimoSiclo,
      estimadoCosecha: productorFinca.estimadoCosecha,
      areaDesarrollo: productorFinca.areaCacaoDesarrollo,
      areaProduccion: productorFinca.areaCacaoProduccion,
      ingresoCertificacion: productorData.fechaIngresoPrograma,
      estadoCertificacion: productorData.estado,
    };
  }

  findOne(id: number) {
    return this.prisma.ficha.findUnique({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
    });
  }

  async findOneData(id: number) {
    try {
      return await this.prisma.ficha.findUnique({
        where: {
          id: typeof id === 'number' ? id : Number.parseInt(id),
        },
        include: {
          InformacionDato: {
            include: {
              dato: {
                include: {
                  seccionesFicha: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      console.error('Error en findOneData:', error);
      throw error;
    }
  }

  async update(id: number, ficha: EntityUpdateFicha): Promise<EntityFicha> {
    return await this.prisma.ficha.update({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
      data: {
        ...ficha,
      },
    });
  }

  remove(id: number) {
    return this.prisma.ficha.delete({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
    });
  }

  async anasysis() {
    const RegAdministrativo = await this.prisma.seccionesFicha.findMany({
      where: {
        nombre: 'Registros Administrativos',
      },
    });

    const inforParcela = await this.prisma.seccionesFicha.findMany({
      where: {
        nombre: 'Información de las Parcelas',
      },
    });

    const RegEpidemiologico = await this.prisma.seccionesFicha.findMany({
      where: {
        nombre: 'Registro Epidemiologico',
      },
    });
  }
}
