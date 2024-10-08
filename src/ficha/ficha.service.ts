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
        id: ficha.id,
        createdAt: ficha?.createdAT,
        localizacion: ficha.localizacion,
        analizada: ficha.analizada,
        trabajador: {
          connect: { id: ficha.IDTrabajador },
        },
        finca: {
          connect: { id: ficha.IDFinca },
        },
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

  async getHeader(id: string) {
    const fichaData = await this.prisma.ficha.findUnique({
      where: {
        id: id,
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

  async findOne(id: string): Promise<FichaInterfaceReturn> {
    const fichaData = await this.prisma.ficha.findUnique({
      where: {
        id: id,
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

  async findOneData(id: string) {
    try {
      return await this.prisma.ficha.findUnique({
        where: {
          id: id,
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

  async update(id: string, ficha: EntityUpdateFicha): Promise<EntityFicha> {
    return await this.prisma.ficha.update({
      where: {
        id: id,
      },
      data: {
        ...ficha,
      },
    });
  }

  remove(id: string) {
    return this.prisma.ficha.delete({
      where: {
        id: id,
      },
    });
  }

  async analysis() {
    let puntajeRegAdminis = 0;
    const RegAdministrativo = await this.prisma.seccionesFicha.findMany({
      include: {
        Dato: {
          include: {
            InformacionDato: true,
          },
        },
      },
    });

    // Recorremos cada sección
    RegAdministrativo.forEach((seccion) => {
      console.log('Desde seccion', seccion);
      // Recorremos cada dato en la sección
      seccion.Dato.forEach((dato) => {
        console.log('Desde dato', dato);
        // Recorremos cada InformacionDato en el dato
        dato.InformacionDato.forEach((info) => {
          if (info.informacion === 'si') {
            puntajeRegAdminis += 2;
          }
        });
      });
    });

    console.log('Puntaje Reg Adminis:', puntajeRegAdminis);

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

  // async InsertData() {
  //     let dato = [
  //       'El mapa de la Finca esta Actualizado?',
  //       'Conserva los recibos o facturas de Venta?',
  //       'El registro de cosecha esta actualizado?',
  //       'El registro de actividades mensuales esta al día?',
  //       'Se realizó el cronograma de actividades del ciclo?',
  //     ];
  //     for (let datas of dato) {
  //       const data = await this.prisma.dato.create({
  //         data: {
  //           titulo: datas,
  //           IDSeccionesFicha: 1,
  //         },
  //       });
  //     }
  //   }

  //     let dato = [
  //       'Nombre de la Parcela',
  //       'Área en Mz',
  //       'Cultivo',
  //       'Insumos Utilizados',
  //     ];
  //     for (let datas of dato) {
  //       const data = await this.prisma.dato.create({
  //         data: {
  //           titulo: datas,
  //           IDSeccionesFicha: 2,
  //         },
  //       });
  //     }

  //     let InformacionDato = ['Parcela numero 1', '5mz', 'cacao', 'si'];

  //     for (let index = 1; index <= InformacionDato.length; index++) {
  //       const data = await this.prisma.informacionDato.create({
  //         data: {
  //           informacion: InformacionDato[index],
  //           IDDato: index,
  //           IDFicha: 4,
  //         },
  //       });
  //     }
  //   console.log('ooooooooooooooo');
}
