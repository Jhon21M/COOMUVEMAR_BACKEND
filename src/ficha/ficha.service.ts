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
      //const clean = await this.prisma.cleanDB();
      const seed = await this.prisma.seedDB();

      return seed;
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
    const fichas = externalData.ficha;
    const informacionDatos = externalData.InformacionDato;
    const documentos = externalData.documento;
    const fichasReturn = [];

    console.log('Imprimiendo el tamaño de documento', documentos.length);
    console.log('Imprimiendo el tamaño de ficha', fichas.length);

    try {
      let contador = 1;
      for (const f of fichas) {
        console.log('Ficha:', f, 'Contador:', contador);
        contador++;
        const fichaCreada = await this.create(f, user);
        fichasReturn.push(fichaCreada);
      }
    } catch (error) {
      console.error('Error al crear la ficha:', error.message);
      throw error;
    }

    const documentosReturn = [];

    try {
      let contador = 1;
      for (const doc of documentos) {
        console.log('documento:', doc);
        console.log('Contador:', contador);
        const IDdocumento = doc.id.toString() + `-UI${user.id}`;
        doc.id = IDdocumento;
        console.log('IDinfoDato a guardarse:', doc);
        contador++;
        const documento = await this.documentoService.create(doc);
        documentosReturn.push(documento);
      }
    } catch (error) {
      console.error('Error al crear la Documento:', error.message);
      throw error;
    }
    // try {
    //   const documento = await this.documentoService.create(documentos[0]);
    //   documentosReturn.push(documento);
    // } catch (error) {
    //   console.error('Error al crear la Documento:', error.message);
    //   throw error;
    // }
    // }

    const informacionDatosReturn = [];
    if (informacionDatos.length > 1) {
      let contador = 1;
      try {
        for (const info of informacionDatos) {
          //console.log('InformacionDato:', info);
          //console.log('Contador:', contador);
          const IDinfoDato = info.id.toString() + `-UI${user.id}`;
          //console.log('IDinfoDato a guardarse:', IDinfoDato);
          const infoDato = await this.prisma.informacionDato.create({
            data: {
              id: IDinfoDato,
              informacion: info.informacion,
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
          //console.log('InformacionDato:', infoDato);
        }
      } catch (error) {
        console.error('Error al crear la InfoDato:', error.message);
        throw error;
      }
    } else {
      try {
        const infoDato = await this.prisma.informacionDato.create({
          data: {
            ...informacionDatos[0],
          },
        });
        informacionDatosReturn.push(infoDato);
      } catch (error) {
        console.error('Error al crear la infoDato:', error.message);
        throw error;
      }
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
  }

  async analysis() {
    const resgistroAdmin = [];
    const InformacionParcelas = [];
    const ManejoPlagas_Enfermedades = [];
    const ControlPlagas_Enfermedades = [];
    const AplicaciónFertilizantes_Edáficos_Foliares = [];
    const ConservaciónSuelos_Agua_Medio_Ambiente = [];
    const RiesgosContaminación_Finca = [];
    const CosechaCosecha_cacao = [];
    const TransporteCosecha = [];
    const ManejoResiduos = [];
    const ResponsabilidadSocial = [];
    const seccionFichaWithRespuestas = {};
    let counter = 0;

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
          counter++;
        }
      }

      await this.prisma.noConformidad.create({
        data: {
          cantidadNoConformidad: counter,
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

    const respuestasRegAdmin = await this.prisma.informacionDato.findMany({
      where: {
        dato: {
          seccionesFicha: {
            nombre: 'Registro Administrativo',
          },
        },
      },
    });

    for (const seccion of seccionesFicha) {
      const respuestasRegAdmin = await this.prisma.informacionDato.findMany({
        where: {
          dato: {
            seccionesFicha: {
              nombre: 'Información de las parcelas',
            },
          },
        },
      });
      InformacionParcelas.push(respuestasRegAdmin);
    }

    for (const seccion of seccionesFicha) {
      const respuestasRegAdmin = await this.prisma.informacionDato.findMany({
        where: {
          dato: {
            seccionesFicha: {
              nombre: 'Manejo de plagas y enfermedades',
            },
          },
        },
      });
      ManejoPlagas_Enfermedades.push(respuestasRegAdmin);
    }

    for (const seccion of seccionesFicha) {
      const respuestasRegAdmin = await this.prisma.informacionDato.findMany({
        where: {
          dato: {
            seccionesFicha: {
              nombre: 'Control de plagas y enfermedades',
            },
          },
        },
      });
      ControlPlagas_Enfermedades.push(respuestasRegAdmin);
    }

    for (const seccion of seccionesFicha) {
      const respuestasRegAdmin = await this.prisma.informacionDato.findMany({
        where: {
          dato: {
            seccionesFicha: {
              nombre: 'Aplicación de fertiliantes edaficos y foleares',
            },
          },
        },
      });
      AplicaciónFertilizantes_Edáficos_Foliares.push(respuestasRegAdmin);
    }

    for (const seccion of seccionesFicha) {
      const respuestasRegAdmin = await this.prisma.informacionDato.findMany({
        where: {
          dato: {
            seccionesFicha: {
              nombre: 'Conservación de suelo, agua y medio ambiente',
            },
          },
        },
      });
      ConservaciónSuelos_Agua_Medio_Ambiente.push(respuestasRegAdmin);
    }

    for (const seccion of seccionesFicha) {
      const respuestasRegAdmin = await this.prisma.informacionDato.findMany({
        where: {
          dato: {
            seccionesFicha: {
              nombre: 'Riesgos de contaminación en la finca',
            },
          },
        },
      });
      RiesgosContaminación_Finca.push(respuestasRegAdmin);
    }

    for (const seccion of seccionesFicha) {
      const respuestasRegAdmin = await this.prisma.informacionDato.findMany({
        where: {
          dato: {
            seccionesFicha: {
              nombre: 'Cosecha y pos cosecha del cacao',
            },
          },
        },
      });
      CosechaCosecha_cacao.push(respuestasRegAdmin);
    }

    for (const seccion of seccionesFicha) {
      const respuestasRegAdmin = await this.prisma.informacionDato.findMany({
        where: {
          dato: {
            seccionesFicha: {
              nombre: 'Transporte de la cosecha',
            },
          },
        },
      });
      TransporteCosecha.push(respuestasRegAdmin);
    }

    for (const seccion of seccionesFicha) {
      const respuestasRegAdmin = await this.prisma.informacionDato.findMany({
        where: {
          dato: {
            seccionesFicha: {
              nombre: 'Manejo de residuos',
            },
          },
        },
      });
      ManejoResiduos.push(respuestasRegAdmin);
    }

    for (const seccion of seccionesFicha) {
      const respuestasRegAdmin = await this.prisma.informacionDato.findMany({
        where: {
          dato: {
            seccionesFicha: {
              nombre: 'Responsabilidad social',
            },
          },
        },
      });
      ResponsabilidadSocial.push(respuestasRegAdmin);
    }

    for (const seccion of seccionesFicha) {
      const respuestasRegAdmin = await this.prisma.informacionDato.findMany({
        where: {
          dato: {
            seccionesFicha: {
              nombre: 'Capacitación',
            },
          },
        },
      });
      capacitación.push(respuestasRegAdmin);
    }
  }
}
