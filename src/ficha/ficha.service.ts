import { ForbiddenException, Injectable } from '@nestjs/common';
import { EntityFicha, EntityUpdateFicha } from './entities';
import { PrismaService } from 'src/prisma/prisma.service';
import { FichaInterfaceReturn } from './interfaces';
import { Documento, Ficha, InformacionDato, Usuario } from '@prisma/client';
import { CreateExternaldataDto } from './dto/load_ficha_dto';
import { DocumentoService } from 'src/documento/documento.service';
import { connect } from 'http2';

@Injectable()
export class FichaService {
  constructor(
    private prisma: PrismaService,
    private readonly documentoService: DocumentoService,
  ) {}
  async cleanDB() {
    try {
      const clean = await this.prisma.cleanDB();
      const seed = await this.prisma.seedDB();

      return { clean, seed };
    } catch (error) {
      return error;
    }
  }

  async loadFicha(
    externalData: CreateExternaldataDto,
    user: Usuario,
  ): Promise<{
    ficha: Ficha[];
    documento: Documento[];
    InformacionDato: InformacionDato[];
  }> {
    const verifyAsing = await this.prisma.inspectorProductor.findFirst({
      where: {
        IDTrabajador: user.IDTrabajador,
      },
    });

    if (!verifyAsing) {
      throw new ForbiddenException(
        'El inspector no esta asignado a este productor',
      );
    }

    const fichas = externalData.ficha;
    const informacionDatos = externalData.InformacionDato;
    const documentos = externalData.documento;
    const fichasReturn = [];
    const documentosReturn = [];
    const informacionDatosReturn = [];

    externalData.ficha.map((ficha) => {
      ficha.id = 'F-' + ficha.id.toString() + `-UI${user.id}`;
    });

    externalData.documento.map((documento) => {
      documento.id = 'D-' + documento.id.toString() + `-UI${user.id}`;
      documento.IDFicha = 'F-' + documento.IDFicha.toString() + `-UI${user.id}`;
    });

    externalData.InformacionDato.map((info) => {
      info.IDFicha = 'F-' + info.IDFicha.toString() + `-UI${user.id}`;
      info.id = 'I-' + info.id.toString() + `-UI${user.id}`;
    });

    try {
      for (const f of fichas) {
        const fichaCreada = await this.create(f, user);
        fichasReturn.push(fichaCreada);
      }
    } catch (error) {
      console.error('Error al crear la ficha:', error.message);
      throw error;
    }

    try {
      let contador = 1;
      for (const doc of documentos) {
        contador++;
        const documento = await this.documentoService.create(doc);
        documentosReturn.push(documento);
      }
    } catch (error) {
      console.error('Error al crear la Documento:', error.message);
      throw error;
    }

    try {
      let contador = 1;
      for (const info of informacionDatos) {
        const infoDato = await this.prisma.informacionDato.create({
          data: {
            id: info.id,
            informacion: info.informacion,
            descripcion: info.descripcion,
            dato: {
              connect: { id: info.IDDato },
            },
            ficha: {
              connect: { id: info.IDFicha },
            },
          },
        });
        informacionDatosReturn.push(infoDato);
        contador++;
      }
    } catch (error) {
      console.error('Error al crear la InfoDato:', error.message);
      throw error;
    }

    return {
      ficha: fichasReturn,
      documento: documentosReturn,
      InformacionDato: informacionDatosReturn,
    };
  }

  async create(ficha: EntityFicha, user: Usuario): Promise<EntityFicha> {
    if (user.role === 'ADMIN') {
      const fichareturn = await this.prisma.ficha.create({
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
      return fichareturn;
    } else {
      const finca = await this.prisma.finca.findFirst({
        where: {
          id: ficha.IDFinca,
        },
      });
      if (!finca) {
        throw new ForbiddenException('Finca no encontrada');
      }

      const productor = await this.prisma.productor.findFirst({
        where: {
          Finca: {
            some: {
              id: ficha.IDFinca,
            },
          },
        },
      });

      const comproAsig = await this.prisma.inspectorProductor.findFirst({
        where: {
          IDProductor: productor.id,
          IDTrabajador: ficha.IDTrabajador,
        },
      });

      if (!comproAsig) {
        throw new ForbiddenException(
          'El inspector no esta asignado a este productor',
        );
      }

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

      await this.prisma.inspectorProductor.update({
        where: {
          id: comproAsig.id,
        },
        data: {
          estadoInspeccion: 'realizada',
        },
      });

      return newFicha;
    }
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
          analizada: ficha.analizada,
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
          analizada: ficha.analizada,
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
      estadoCertificacion: fichaData.finca.productor.estado,
      inspector: fichaData.trabajador.nombre + fichaData.trabajador.apellido,
    };
  }

  async findOne(id: string): Promise<FichaInterfaceReturn> {
    if (!id) {
      throw new ForbiddenException('No se proporciono un ID de ficha');
    }

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

    if (!fichaData) {
      throw new ForbiddenException('Ficha no encontrada o no existe');
    }

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
      const findfichaData = await this.prisma.ficha.findUnique({
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

      if (!findfichaData) {
        throw new ForbiddenException('Ficha no encontrada o no existe');
      }

      return findfichaData;
    } catch (error) {
      console.error('Error en findOneData:', error);
      throw error;
    }
  }

  async DataFormated(id: string) {
    try {
      const findfichaData = await this.prisma.ficha.findUnique({
        where: {
          id: id,
        },
      });
      if (!findfichaData) {
        throw new ForbiddenException('Ficha no encontrada o no existe');
      }

      // const fichaData = {
      //     ficha: findfichaData,
      //     secciones: {},
      //   };

      // const noConformidades = await this.prisma.noConformidad.findMany({
      //   where: {
      //     IDFicha: ficha_analized.id,
      //   },
      //   include: {
      //     seccionesFicha: true,
      //   },
      // });

      // if (noConformidades.length < 1) {
      //   throw new ForbiddenException('La ficha no esta analizada');
      // }
      // const fichaData = {
      //   ficha: ficha_analized,
      //   secciones: {},
      // };
      // for (let noConformidad of noConformidades) {
      //   fichaData.secciones[noConformidad.seccionesFicha.nombre] =
      //     noConformidad.cantidadNoConformidad;
      // }

      if (!findfichaData) {
        throw new ForbiddenException('Ficha no encontrada o no existe');
      }

      return findfichaData;
    } catch (error) {
      console.error('Error en findOneData:', error);
      throw error;
    }
  }

  async update(id: string, ficha: EntityUpdateFicha): Promise<EntityFicha> {
    const fichafind = await this.prisma.ficha.findUnique({
      where: {
        id: id,
      },
    });

    if (!fichafind) {
      throw new ForbiddenException('Ficha no encontrada');
    }

    return await this.prisma.ficha.update({
      where: {
        id: fichafind.id,
      },
      data: {
        ...ficha,
      },
    });
  }

  remove(id: string) {
    try {
      const ficha = this.prisma.ficha.findUnique({
        where: {
          id: id,
        },
      });

      if (!ficha) {
        throw new ForbiddenException('Ficha no encontrada');
      }
      return this.prisma.ficha.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new ForbiddenException('No se encontro la ficha');
    }
  }

  async analysis() {
    // const resgistroAdmin = [];
    // const InformacionParcelas = [];
    // const ManejoPlagas_Enfermedades = [];
    // const ControlPlagas_Enfermedades = [];
    // const AplicaciónFertilizantes_Edáficos_Foliares = [];
    // const ConservaciónSuelos_Agua_Medio_Ambiente = [];
    // const RiesgosContaminación_Finca = [];
    // const CosechaCosecha_cacao = [];
    // const TransporteCosecha = [];
    // const ManejoResiduos = [];
    // const ResponsabilidadSocial = [];
    // const seccionFichaWithRespuestas = {};
    let NoConformidad_counter = 0;

    const seccionesFicha = await this.prisma.seccionesFicha.findMany();

    for (const seccion of seccionesFicha) {
      const respuestas = await this.prisma.informacionDato.findMany({
        where: {
          dato: {
            seccionesFicha: {
              id: seccion.id,
            },
          },
        },
      });

      for (const info of respuestas) {
        if (info.informacion == 'NO') {
          NoConformidad_counter++;
        }
      }

      await this.prisma.noConformidad.create({
        data: {
          cantidadNoConformidad: NoConformidad_counter,
          seccionesFicha: {
            connect: {
              id: seccion.id,
            },
          },
          ficha: {
            connect: {
              id: respuestas[0].IDFicha,
            },
          },
        },
      });
    }
  }

  async analisis(id: string) {
    let NoConformidad_counter = 0;
    const fichanalizad = {};

    const ficha_NoConformidad = await this.prisma.noConformidad.findFirst({
      where: {
        ficha: {
          id: id,
        },
      },
    });

    if (ficha_NoConformidad) {
      throw new ForbiddenException('Ya se realizo el analisis de la ficha');
    }

    const seccionesFicha = await this.prisma.seccionesFicha.findMany();

    // Analisis de Registros Administrativos
    for (const seccion of seccionesFicha) {
      const respuestas = await this.prisma.informacionDato.findMany({
        where: {
          dato: {
            seccionesFicha: {
              nombre: 'Registros Administrativos',
            },
          },
        },
      });

      for (const info of respuestas) {
        if (info.informacion == 'NO') {
          NoConformidad_counter++;
        }
      }

      const noConformidad_created = await this.prisma.noConformidad.create({
        data: {
          cantidadNoConformidad: NoConformidad_counter,
          descripcion: seccion.nombre,
          seccionesFicha: {
            connect: {
              id: seccion.id,
            },
          },
          ficha: {
            connect: {
              id: respuestas[0].IDFicha,
            },
          },
        },
      });
      await this.prisma.ficha.update({
        where: {
          id: id,
        },
        data: {
          analizada: true,
        },
      });

      fichanalizad[seccion.nombre] = noConformidad_created;
    }
    return Object.values(fichanalizad);
  }

  async removeAnalisis(id: string) {
    try {
      const ficha_NoConformidad = await this.prisma.noConformidad.findFirst({
        where: {
          IDFicha: id,
        },
      });

      if (!ficha_NoConformidad) {
        throw new ForbiddenException(
          'No se ha realizado el analisis de la ficha',
        );
      }

      await this.prisma.noConformidad.deleteMany({
        where: {
          IDFicha: id,
        },
      });
      return { 'Ficha analizada eliminada': id };
    } catch (error) {
      return error;
    }
  }

  async noConformidadAll() {
    const ficha_analized_data = [];
    const ficha_analized = await this.prisma.ficha.findMany({
      where: {
        analizada: true,
      },
    });
    if (ficha_analized.length < 1) {
      throw new ForbiddenException('No hay ficha analizadas');
    }

    for (let f of ficha_analized) {
      const noConformidades = await this.prisma.noConformidad.findMany({
        where: {
          IDFicha: f.id,
        },
        include: {
          seccionesFicha: true,
        },
      });

      if (noConformidades.length > 0) {
        const fichaData = {
          ficha: f,
          secciones: {},
        };

        for (let noConformidad_finded of noConformidades) {
          fichaData.secciones[noConformidad_finded.seccionesFicha.nombre] =
            noConformidad_finded.cantidadNoConformidad;
        }

        ficha_analized_data.push(fichaData);
      }
    }

    return ficha_analized_data;
  }

  async noConformidadOne(id: string) {
    const ficha_analized = await this.prisma.ficha.findUnique({
      where: {
        id: id,
        analizada: true,
      },
    });

    const noConformidades = await this.prisma.noConformidad.findMany({
      where: {
        IDFicha: ficha_analized.id,
      },
      include: {
        seccionesFicha: true,
      },
    });

    if (noConformidades.length < 1) {
      throw new ForbiddenException('La ficha no esta analizada');
    }
    const fichaData = {
      ficha: ficha_analized,
      secciones: {},
    };
    for (let noConformidad of noConformidades) {
      fichaData.secciones[noConformidad.seccionesFicha.nombre] =
        noConformidad.cantidadNoConformidad;
    }

    return fichaData;
  }
}
