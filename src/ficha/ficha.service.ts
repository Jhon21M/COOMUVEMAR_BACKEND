import {
  ForbiddenException,
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';
import { EntityFicha, EntityUpdateFicha } from './entities';
import { PrismaService } from 'src/prisma/prisma.service';
import { FichaInterfaceReturn } from './interfaces';
import { Documento, Ficha, InformacionDato, Usuario } from '@prisma/client';
import { CreateExternaldataDto } from './dto/load_ficha_dto';
import { DocumentoService } from 'src/documento/documento.service';
import * as reglasResiduos from 'src/common/data/rulesManejo_residuos.json';
import * as fs from 'fs';
import * as path from 'path';
import { CreateInsumoDto } from './dto/create_insumos_dto';

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

    for (let f of fichas) {
      const verifyFicha = await this.prisma.ficha.findFirst({
        where: { id: f.id },
      });
      if (verifyFicha) {
        throw new ForbiddenException('La ficha ya existe');
      }
    }

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
      console.error('Error al crear la ficha:', (error as any).message);
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
      console.error('Error al crear la Documento:', (error as any).message);
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
      console.error('Error al crear la InfoDato:', (error as any).message);
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
      throw new ForbiddenException('Ficha no encontrada o no existe5');
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
        throw new ForbiddenException('Ficha no encontrada o no existe3');
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
        throw new ForbiddenException('Ficha no encontrada o no existepp2');
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
        throw new ForbiddenException('Ficha no encontrada o no existepp');
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

  async analisis(id: string) {
    const fichanalizad = {};
    let noConformidad_RA_created;
    let noConformidad_IP_created;
    let noConformidad_CPE_created;
    let noConformidad_AFEF_created;
    let noConformidad_CSAMA_created;
    let noConformidad_RCF_created;
    let noConformidad_MR_created;
    let noConformidad_RS_created;
    let noConformidad_C_created;

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

    // Analisis de Registros Administrativos
    const respuestas_R_A = await this.prisma.informacionDato.findMany({
      where: {
        IDFicha: id,
        dato: {
          seccionesFicha: {
            nombre: 'Registros administrativos',
          },
        },
      },
    });

    for (const respuestas of respuestas_R_A) {
      if (respuestas.informacion == 'NO') {
        noConformidad_RA_created = await this.prisma.noConformidad.create({
          data: {
            // cantidadNoConformidad: NoConformidad_R_A_counter,
            // descripcion: '',
            dato: {
              connect: {
                id: respuestas.IDDato,
              },
            },
            ficha: {
              connect: {
                id: id,
              },
            },
          },
        });
      }
    }

    // informacion Parcelas
    const respuestas_I_P = await this.prisma.informacionDato.findMany({
      where: {
        dato: {
          seccionesFicha: {
            nombre: 'Información de las parcelas',
          },
        },
      },
      include: {
        dato: true,
      },
    });

    // Filtrar los elementos donde dato.nombre sea 'Insumos'
    const Insumos = respuestas_I_P.filter(
      (informacion) => informacion.dato.titulo === 'Insumos utilizados',
    );

    for (let valueToValidate of Insumos) {
      const returnOfValidation = await this.validateProductoAplicado(
        valueToValidate.informacion,
        'Insumo',
      );

      if (!returnOfValidation.valid) {
        noConformidad_IP_created = await this.prisma.noConformidad.create({
          data: {
            // cantidadNoConformidad: NoConformidad_I_P_counter,
            // descripcion: '',
            dato: {
              connect: {
                id: valueToValidate.IDDato,
              },
            },
            ficha: {
              connect: {
                id: id,
              },
            },
          },
        });
      }
    }

    // Manejo de plagas y enfermedades
    const respuestas_M_P_E = await this.prisma.informacionDato.findMany({
      where: {
        dato: {
          seccionesFicha: {
            nombre: 'Manejo de plagas y enfermedades',
          },
        },
      },
      include: {
        dato: true,
      },
    });

    // Control de Plagas y Enfermedades
    const respuestas_C_P_E = await this.prisma.informacionDato.findMany({
      where: {
        dato: {
          seccionesFicha: {
            nombre: 'Control de plagas y enfermedades',
          },
        },
      },
      include: {
        dato: true,
      },
    });

    const producto_aplicado = respuestas_C_P_E.filter(
      (informacion) => informacion.dato.titulo === 'Producto Aplicado',
    );

    for (let valueToValidate of producto_aplicado) {
      const returnOfValidation = await this.validateProductoAplicado(
        valueToValidate.informacion,
        'Metodo',
      );
      if (!returnOfValidation.valid) {
        noConformidad_CPE_created = await this.prisma.noConformidad.create({
          data: {
            // cantidadNoConformidad: NoConformidad_I_P_counter,
            // descripcion: '',
            dato: {
              connect: {
                id: valueToValidate.IDDato,
              },
            },
            ficha: {
              connect: {
                id: id,
              },
            },
          },
        });
      }
    }

    // Aplicación de fertiliantes edaficos y foleares
    const respuestas_A_FE_F = await this.prisma.informacionDato.findMany({
      where: {
        dato: {
          seccionesFicha: {
            nombre: 'Aplicación de fertilizantes edaficos y foleares',
          },
        },
      },
      include: {
        dato: true,
      },
    });

    const nombre_abono = respuestas_A_FE_F.filter(
      (informacion) => informacion.dato.titulo === 'Nombre del abono',
    );

    for (let valueToValidate of nombre_abono) {
      const returnOfValidation = await this.validateProductoAplicado(
        valueToValidate.informacion,
        'Insumo',
      );
      if (!returnOfValidation.valid) {
        noConformidad_AFEF_created = await this.prisma.noConformidad.create({
          data: {
            // cantidadNoConformidad: NoConformidad_I_P_counter,
            // descripcion: '',
            dato: {
              connect: {
                id: valueToValidate.IDDato,
              },
            },
            ficha: {
              connect: {
                id: id,
              },
            },
          },
        });
      }
    }

    //Conservación de suelo, agua y medio ambiente
    const respuestas_C_S_A_M_A = await this.prisma.informacionDato.findMany({
      where: {
        dato: {
          seccionesFicha: {
            nombre: 'Conservación de suelo, agua y medio ambiente',
          },
        },
      },
      include: {
        dato: true,
      },
    });

    for (const respuestas of respuestas_C_S_A_M_A) {
      if (respuestas.informacion == 'NO') {
        noConformidad_CSAMA_created = await this.prisma.noConformidad.create({
          data: {
            // cantidadNoConformidad: NoConformidad_R_A_counter,
            // descripcion: '',
            dato: {
              connect: {
                id: respuestas.IDDato,
              },
            },
            ficha: {
              connect: {
                id: id,
              },
            },
          },
        });
      }
    }

    // Riesgos de contaminación en la finca
    const respuestas_R_C_F = await this.prisma.informacionDato.findMany({
      where: {
        dato: {
          seccionesFicha: {
            nombre: 'Riesgos de contaminación en la finca',
          },
        },
      },
      include: {
        dato: true,
      },
    });

    for (const respuestas of respuestas_R_C_F) {
      if (respuestas.informacion == 'NO') {
        noConformidad_RCF_created = await this.prisma.noConformidad.create({
          data: {
            // cantidadNoConformidad: NoConformidad_R_A_counter,
            // descripcion: '',
            dato: {
              connect: {
                id: respuestas.IDDato,
              },
            },
            ficha: {
              connect: {
                id: id,
              },
            },
          },
        });
      }
    }

    // Cosecha y pos cosecha del cacao
    const respuestas_C_P_C = await this.prisma.informacionDato.findMany({
      where: {
        dato: {
          seccionesFicha: {
            nombre: 'Cosecha y pos cosecha del cacao',
          },
        },
      },
      include: {
        dato: true,
      },
    });

    // Manejo de residuos
    const respuestas_M_R = await this.prisma.informacionDato.findMany({
      where: {
        dato: {
          seccionesFicha: {
            nombre: 'Manejo de residuos',
          },
        },
      },
      include: {
        dato: {
          include: {
            seccionesFicha: true,
          },
        },
      },
    });

    const manejo_residuos = respuestas_M_R.filter(
      (informacion) =>
        informacion.dato.seccionesFicha.nombre === 'Manejo de residuos',
    );

    for (let valueToValidate of manejo_residuos) {
      const returnOfValidation = await this.validarResiduos(
        valueToValidate.dato.titulo,
        valueToValidate.informacion,
      );
      if (!returnOfValidation.esBuenManejo) {
        noConformidad_MR_created = await this.prisma.noConformidad.create({
          data: {
            // cantidadNoConformidad: NoConformidad_I_P_counter,
            // descripcion: '',
            dato: {
              connect: {
                id: valueToValidate.IDDato,
              },
            },
            ficha: {
              connect: {
                id: id,
              },
            },
          },
        });
      }
    }

    // Responsabilidad social
    const respuestas_R_S = await this.prisma.informacionDato.findMany({
      where: {
        dato: {
          seccionesFicha: {
            nombre: 'Responsabilidad social',
          },
        },
      },
      include: {
        dato: true,
      },
    });

    const respuestas_R_S_seccion = respuestas_R_S.filter(
      (informacion) =>
        informacion.dato.titulo ===
          '¿La educación escolar no se perjudica, aunque los niños estén apoyando las actividades de campo?' ||
        informacion.dato.titulo === '¿Se garantiza la seguridad en el trabajo?',
    );
    const res1 = respuestas_R_S_seccion[0].informacion;
    const res2 = respuestas_R_S_seccion[1].informacion;

    if (res1 == 'Si' && res2 == 'NO') {
      noConformidad_RS_created = await this.prisma.noConformidad.create({
        data: {
          dato: {
            connect: {
              id: respuestas_R_S_seccion[0].IDDato,
            },
          },
          ficha: {
            connect: {
              id: id,
            },
          },
        },
      });
      noConformidad_RS_created = await this.prisma.noConformidad.create({
        data: {
          dato: {
            connect: {
              id: respuestas_R_S_seccion[1].IDDato,
            },
          },
          ficha: {
            connect: {
              id: id,
            },
          },
        },
      });
    }

    // Capacitación
    const respuestas_C = await this.prisma.informacionDato.findMany({
      where: {
        dato: {
          seccionesFicha: {
            nombre: 'Capacitación',
          },
        },
      },
      include: {
        dato: true,
      },
    });

    for (const respuestas of respuestas_C) {
      if (respuestas.informacion == 'NO') {
        noConformidad_C_created = await this.prisma.noConformidad.create({
          data: {
            // cantidadNoConformidad: NoConformidad_R_A_counter,
            // descripcion: '',
            dato: {
              connect: {
                id: respuestas.IDDato,
              },
            },
            ficha: {
              connect: {
                id: id,
              },
            },
          },
        });
      }
    }

    // --------------------------
    await this.prisma.ficha.update({
      where: {
        id: id,
      },
      data: {
        analizada: true,
      },
    });

    // Retorno de la información
    // fichanalizad['Registros adminitrativos'] = noConformidad_RA_created;
    // fichanalizad['Información de parcelas'] = noConformidad_IP_created;
    // fichanalizad['Manejo de plagas y enfermedades'] = noConformidad_CPE_created;
    // fichanalizad['Control de plagas y enfermedades'] =
    //   noConformidad_CPE_created;
    // fichanalizad['Aplicación de fertilizantes edaficos y foleares'] =
    //   noConformidad_AFEF_created;
    // fichanalizad['Conservación de suelo, agua y medio ambiente'] =
    //   noConformidad_CSAMA_created;
    // fichanalizad['Riesgos de contaminación en la finca'] =
    //   noConformidad_RCF_created;
    // fichanalizad['Cosecha y pos cosecha del cacao'] = noConformidad_C_created;
    // fichanalizad['Manejo de residuos'] = noConformidad_MR_created;
    // fichanalizad['Responsabilidad social'] = noConformidad_RS_created;
    // fichanalizad['Capacitación'] = noConformidad_C_created;
    //return Object.values(fichanalizad);
    return { 'Ficha Analizada Correctamente': fichanalizad };
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

      await this.prisma.ficha.update({
        where: {
          id: id,
        },
        data: {
          analizada: false,
        },
      });

      return { 'Analisis de Ficha eliminada': id };
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
          dato: {
            include: {
              seccionesFicha: true,
            },
          },
        },
      });

      const informacionDato = await this.prisma.informacionDato.findMany({
        where: {
          IDFicha: f.id,
        },
      });

      if (noConformidades.length > 0) {
        const fichaData = {
          ficha: f,
          secciones: {},
        };

        for (let noConformidad_finded of noConformidades) {
          fichaData.secciones[noConformidad_finded.dato.seccionesFicha.nombre] =
            {
              [noConformidad_finded.dato.titulo]: informacionDato.find(
                (info) => info.IDDato === noConformidad_finded.dato.id,
              ).informacion,
            };
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

    if (!ficha_analized) {
      throw new ForbiddenException('La ficha no esta analizada');
    }

    const noConformidades = await this.prisma.noConformidad.findMany({
      where: {
        IDFicha: ficha_analized.id,
      },
      include: {
        ficha: true,
        dato: {
          include: {
            seccionesFicha: true,
          },
        },
      },
    });

    if (noConformidades.length < 1) {
      throw new ForbiddenException('La ficha no esta analizada');
    }

    const informacionDato = await this.prisma.informacionDato.findMany({
      where: {
        IDFicha: ficha_analized.id,
      },
    });

    const fichaData = {
      ficha: ficha_analized,
      secciones: {},
    };
    for (let noConformidad of noConformidades) {
      fichaData.secciones[noConformidad.dato.seccionesFicha.nombre] = {
        [noConformidad.dato.titulo]: informacionDato.find(
          (info) => info.IDDato === noConformidad.dato.id,
        ).informacion,
      };
    }

    return fichaData;
  }

  async validateProductoAplicado(entryInsumo: string, tipo: string) {
    console.log('desde producto_aplicado', entryInsumo, tipo);
    const insumos = await this.prisma.productosUtilizados.findMany({
      select: {
        producto_aplicado: true,
        tipo: true,
      },
    });

    const nombresInsumos = insumos.map((insumo) =>
      insumo.producto_aplicado.toLowerCase(),
    );
    const tiposInsumos = insumos.map((insumo) => insumo.tipo.toLowerCase());

    const validNombre = nombresInsumos.includes(entryInsumo.toLowerCase());
    const validTipo = tiposInsumos.includes(tipo.toLowerCase());

    if (validNombre || validTipo) {
      return { valid: true, message: 'El insumo es permitido.' };
    } else {
      return {
        valid: false,
        message: 'El insumo no está permitido según las normas orgánicas.',
      };
    }
  }

  async validarResiduos(tipoResiduo: string, manejoRealizado: string) {
    console.log('desde Manejo de residuos', tipoResiduo, manejoRealizado);

    const reglasResiduosLowerCase = Object.keys(reglasResiduos).reduce(
      (acc, key) => {
        acc[key.toLowerCase()] = reglasResiduos[key];
        return acc;
      },
      {},
    );

    const reglas = reglasResiduosLowerCase[tipoResiduo.toLowerCase()];

    if (!reglas) {
      throw new NotFoundException(
        `Tipo de residuo ${tipoResiduo} no encontrado.`,
      );
    }

    const manejoRealizadoLower = manejoRealizado.toLowerCase();

    // Búsqueda de coincidencias parciales
    const esBuenManejo = reglas.buenManejo.some((rule) =>
      manejoRealizadoLower.includes(rule.toLowerCase()),
    );
    const esMalManejo = reglas.malManejo.some((rule) =>
      manejoRealizadoLower.includes(rule.toLowerCase()),
    );

    if (esBuenManejo) {
      return {
        esBuenManejo: true,
        mensaje: 'El manejo del residuo es adecuado.',
      };
    }

    if (esMalManejo) {
      return {
        esBuenManejo: false,
        mensaje: `Mal manejo detectado: ${manejoRealizado}`,
      };
    }

    return {
      esBuenManejo: false,
      mensaje: 'No se pudo determinar si el manejo es adecuado.',
    };
  }

  // async validarResiduos(tipoResiduo: string, manejoRealizado: string) {
  //   console.log('desde Manejo de residuos', tipoResiduo, manejoRealizado);

  //   const fuse = new Fuse(Object.keys(reglasResiduos), {
  //     includeScore: true,
  //     threshold: 0.3, // Ajusta este valor según sea necesario
  //   });

  //   const result = fuse.search(tipoResiduo);

  //   if (result.length === 0) {
  //     throw new NotFoundException(
  //       `Tipo de residuo ${tipoResiduo} no encontrado.`,
  //     );
  //   }

  //   const bestMatch = result[0].item;
  //   const reglas = reglasResiduos[bestMatch];

  //   const manejoRealizadoLower = manejoRealizado.toLowerCase();

  //   // Búsqueda de coincidencias parciales
  //   const esBuenManejo = reglas.buenManejo.some((rule) =>
  //     manejoRealizadoLower.includes(rule.toLowerCase()),
  //   );
  //   const esMalManejo = reglas.malManejo.some((rule) =>
  //     manejoRealizadoLower.includes(rule.toLowerCase()),
  //   );

  //   if (esBuenManejo) {
  //     return {
  //       esBuenManejo: true,
  //       mensaje: 'El manejo del residuo es adecuado.',
  //     };
  //   }

  //   if (esMalManejo) {
  //     return {
  //       esBuenManejo: false,
  //       mensaje: `Mal manejo detectado: ${manejoRealizado}`,
  //     };
  //   }

  //   return {
  //     esBuenManejo: false,
  //     mensaje: 'No se pudo determinar si el manejo es adecuado.',
  //   };
  // }

  async actualizarReglas(
    tipoResiduo: string,
    nuevoBuenManejo?: string[],
    nuevoMalManejo?: string[],
  ) {
    if (!reglasResiduos[tipoResiduo]) {
      reglasResiduos[tipoResiduo] = { buenManejo: [], malManejo: [] };
    }

    if (nuevoBuenManejo) {
      reglasResiduos[tipoResiduo].buenManejo.push(...nuevoBuenManejo);
    }

    if (nuevoMalManejo) {
      reglasResiduos[tipoResiduo].malManejo.push(...nuevoMalManejo);
    }

    // Guardar cambios en el archivo
    const filePath = path.join(
      __dirname,
      '../common/data/rulesManejo_residuos.json',
    );
    fs.writeFileSync(filePath, JSON.stringify(reglasResiduos, null, 2));
  }

  async updateInsumos(insumos_aplicado_permitido: CreateInsumoDto) {
    try {
      await this.prisma.productosUtilizados.create({
        data: {
          ...insumos_aplicado_permitido,
        },
      });
    } catch (error) {
      return {
        message: 'Error al actualizar ProductosAplicados',
        error: (error as any).message,
      };
    }
  }

  async ReporteEstadistica() {
    const ReporteProductoresAsingados =
      await this.ReporteProductoresAsingados();
    const ReporteIngresoProductoresAlPrograma =
      await this.ReporteIngresoProductoresAlPrograma();
    const ReporteCumplimientoInspecciones =
      await this.ReporteCumplimientoInspecciones();
    const ReporteCumplimientoNormas = await this.ReporteCumplimientoNormas();

    return {
      ReporteProductoresAsingados,
      ReporteIngresoProductoresAlPrograma,
      ReporteCumplimientoInspecciones,
      ReporteCumplimientoNormas,
    };
  }

  async ReporteCumplimientoNormas() {
    const fichas = await this.prisma.ficha.findMany({
      where: {
        analizada: true,
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

    const seccionAprobada = await this.prisma.seccionesFicha.findMany({
      where: {
        nombre: 'Decisión del comite',
      },
      include: {
        Dato: true,
      },
    });

    const aprobados = [];
    const sancionados = [];

    fichas.forEach((ficha) => {
      ficha.InformacionDato.forEach((informacionDato) => {
        const dato = informacionDato.dato;
        if (dato.seccionesFicha.nombre === 'Decisión del comite') {
          if (dato.titulo === 'Aprobado con sanciones') {
            aprobados.push(ficha);
          } else if (dato.titulo === 'Aprobado sin sanciones') {
            aprobados.push(ficha);
          } else if (dato.titulo === 'Sancionado') {
            sancionados.push(ficha);
          }
        }
      });
    });

    return {
      aprobados: aprobados.length,
      sancionados: sancionados.length,
    };
  }

  async ReporteProductoresAsingados() {
    const currentYear = new Date().getFullYear();
    const report = [];

    for (let month = 0; month < 12; month += 2) {
      const startDate = new Date(currentYear, month, 1);
      const endDate = new Date(currentYear, month + 2, 0);

      const productoresAsignados = await this.prisma.inspectorProductor.count({
        where: {
          created: {
            gte: startDate,
            lte: endDate,
          },
        },
      });

      const productoresNoAsignados = await this.prisma.productor.count({
        where: {
          NOT: {
            Inspectorproductor: {
              some: {
                created: {
                  gte: startDate,
                  lte: endDate,
                },
              },
            },
          },
        },
      });

      report.push({
        periodo: `${startDate.toLocaleString('default', {
          month: 'long',
        })}-${endDate.toLocaleString('default', { month: 'long' })}`,
        asignados: productoresAsignados,
        noAsignados: productoresNoAsignados,
      });
    }

    return report;
  }

  async ReporteIngresoProductoresAlPrograma() {
    const currentYear = new Date().getFullYear();
    const startYear = 2019;
    const report = [];

    for (let year = startYear; year <= currentYear; year++) {
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year, 11, 31, 23, 59, 59);

      const productoresAgregados = await this.prisma.productor.count({
        where: {
          fechaIngresoPrograma: {
            gte: startDate,
            lte: endDate,
          },
        },
      });

      report.push({
        year,
        productoresAgregados,
      });
    }

    return report;
  }

  async ReporteCumplimientoInspecciones() {
    const currentYear = new Date().getFullYear();
    const report = [];

    // Cumplimiento de visitas de inspectores a los productores en intervalos de dos meses
    for (let month = 0; month < 12; month += 2) {
      const startDate = new Date(currentYear, month, 1);
      const endDate = new Date(currentYear, month + 2, 0);

      const visitasRealizadas = await this.prisma.inspectorProductor.count({
        where: {
          estadoInspeccion: {
            not: null,
          },
          updated: {
            gte: startDate,
            lte: endDate,
          },
        },
      });

      report.push({
        periodo: `${startDate.toLocaleString('default', {
          month: 'long',
        })}-${endDate.toLocaleString('default', { month: 'long' })}`,
        visitasRealizadas,
      });
    }

    return report;
  }
}
