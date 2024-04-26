import { Injectable } from '@nestjs/common';
import { EntityFicha, EntityUpdateFicha } from './entities';
import { PrismaService } from 'src/prisma/prisma.service';
import { FichaInterfaceReturn } from './interfaces';
import { Usuario } from '@prisma/client';

@Injectable()
export class FichaService {
  constructor(private prisma: PrismaService) {}

  async create(ficha: EntityFicha): Promise<EntityFicha> {
    const newFicha = await this.prisma.ficha.create({
      data: {
        createdAt: ficha?.createdAT,
        localizacion: ficha.localizacion,
        analizada: ficha.analizada,
        IDTrabajador: ficha.IDTrabajador,
        IDFinca: ficha.IDFinca,
      },
    });

    return newFicha;
  }

  async findAll(user: Usuario): Promise<FichaInterfaceReturn[]> {
    if (user.role === 'ADMIN') {
      const fichaData = await this.prisma.ficha.findMany({
        include: {
          finca: {
            include: {
              productor: true,
            },
          },
          trabajador: true,
        },
      });

      const returndata: FichaInterfaceReturn[] = [];

      for (const ficha of fichaData) {
        const userInspector = await this.prisma.usuario.findFirst({
          where: {
            IDTrabajador: ficha.trabajador.id,
          },
        });

        const returndataItem: FichaInterfaceReturn = {
          id: ficha.id,
          nombre: ficha.trabajador.nombre + ficha.trabajador.apellido,
          fecha: ficha.createdAt,
          email: userInspector.email,
          urlmagen: ficha.trabajador.urlImg,
          finca: ficha.finca.nombre,
          productor:
            ficha.finca.productor.nombre + ficha.finca.productor.apellido,
          localizacion: ficha.localizacion,
          analizada: true,
        };

        returndata.push(returndataItem);
      }

      return returndata;
    } else {
      const fichaData = await this.prisma.ficha.findMany({
        where: {
          IDTrabajador: user.IDTrabajador,
        },
        include: {
          finca: {
            include: {
              productor: true,
            },
          },
          trabajador: true,
        },
      });

      const returndata: FichaInterfaceReturn[] = [];

      for (const ficha of fichaData) {
        const userInspector = await this.prisma.usuario.findFirst({
          where: {
            id: user.id,
          },
        });

        const returndataItem: FichaInterfaceReturn = {
          id: ficha.id,
          nombre: ficha.trabajador.nombre + ficha.trabajador.apellido,
          fecha: ficha.createdAt,
          email: userInspector.email,
          urlmagen: ficha.trabajador.urlImg,
          finca: ficha.finca.nombre,
          productor:
            ficha.finca.productor.nombre + ficha.finca.productor.apellido,
          localizacion: ficha.localizacion,
          analizada: true,
        };

        returndata.push(returndataItem);
      }

      return returndata;
    }
  }

  async getHeader(id: number) {
    const fichaData = await this.prisma.ficha.findUnique({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
      include: {
        finca: {
          include: {
            productor: true,
          },
        },
        trabajador: true,
      },
    });

    return {
      productor:
        fichaData.finca.productor.nombre + fichaData.finca.productor.apellido,
      cedula: fichaData.finca.productor.numeroCedula,
      telefono: fichaData.finca.productor.numeroTelefono,
      fechaInspeccion: fichaData.createdAt,
      codProductor: fichaData.finca.productor.id,
      comunidad: fichaData.finca.comunidad,
      finca: fichaData.finca.nombre,
      produccionultimoCiclo: fichaData.finca.produccionUltimoSiclo,
      estimadoCosecha: fichaData.finca.estimadoCosecha,
      areaDesarrollo: fichaData.finca.areaCacaoDesarrollo,
      areaProduccion: fichaData.finca.areaCacaoProduccion,
      ingresoCertificacion: fichaData.finca.productor.fechaIngresoPrograma,
      estadoCertificacion: fichaData.finca.productor.estadoProgramaC,
      inspector: fichaData.trabajador.nombre + fichaData.trabajador.apellido,
    };
  }

  async findOne(id: number): Promise<FichaInterfaceReturn> {
    const fichaData = await this.prisma.ficha.findUnique({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
      include: {
        finca: {
          include: {
            productor: true,
          },
        },
        trabajador: {
          include: {
            Usuario: true,
          },
        },
      },
    });

    const returndata: FichaInterfaceReturn = {
      id: fichaData.id,
      nombre: fichaData.trabajador.nombre + fichaData.trabajador.apellido,
      fecha: fichaData.createdAt,
      email: fichaData.trabajador.Usuario[0].email,
      urlmagen: fichaData.trabajador.urlImg,
      finca: fichaData.finca.nombre,
      productor:
        fichaData.finca.productor.nombre + fichaData.finca.productor.apellido,
      localizacion: fichaData.localizacion,
      analizada: fichaData.analizada,
    };

    return returndata;
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
