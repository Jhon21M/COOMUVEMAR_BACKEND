import { Injectable } from '@nestjs/common';
import { PrismaClient, Productor } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }

  async cleanDB() {
    try {
      await this.$transaction([
        this.dato.deleteMany(),
        this.desicion.deleteMany(),
        this.documento.deleteMany(),
        this.ficha.deleteMany(),
        this.finca.deleteMany(),
        this.inspectorProductor.deleteMany(),
        this.informacionDato.deleteMany(),
        this.productor.deleteMany(),
        this.seccionesFicha.deleteMany(),
        //this.trabajador.deleteMany(),
        //this.usuario.deleteMany(),
      ]);

      await this.$executeRaw`TRUNCATE TABLE "datos" RESTART IDENTITY CASCADE`;
      await this
        .$executeRaw`TRUNCATE TABLE "Desicion" RESTART IDENTITY CASCADE`;
      await this
        .$executeRaw`TRUNCATE TABLE "Documento" RESTART IDENTITY CASCADE`;
      await this.$executeRaw`TRUNCATE TABLE "fichas" RESTART IDENTITY CASCADE`;
      await this.$executeRaw`TRUNCATE TABLE "fincas" RESTART IDENTITY CASCADE`;
      await this
        .$executeRaw`TRUNCATE TABLE "InspectorProductor" RESTART IDENTITY CASCADE`;
      await this
        .$executeRaw`TRUNCATE TABLE "informacionDatos" RESTART IDENTITY CASCADE`;
      await this
        .$executeRaw`TRUNCATE TABLE "productores" RESTART IDENTITY CASCADE`;
      await this
        .$executeRaw`TRUNCATE TABLE "SeccionesFichas" RESTART IDENTITY CASCADE`;
      // await this
      //   .$executeRaw`TRUNCATE TABLE "Trabajador" RESTART IDENTITY CASCADE`;
      // await this.$executeRaw`TRUNCATE TABLE "Usuario" RESTART IDENTITY CASCADE`;
      return {
        message: 'Database cleaned successfully',
      };
    } catch (error) {
      console.error('Error cleaning database:', error);
      return error;
    }
  }

  async seedDB() {
    // INSERTANDO PRODUCTORES
    const productores = [
      {
        id: 1,
        nombre: 'Carlos Alberto',
        apellido: 'Ramírez López',
        numeroCedula: '6102207991013E',
        numeroTelefono: '89262853',
        fechaIngresoPrograma: '2016-02-01T00:00:00.000Z',
        estado: 2, // T2
      },
      {
        id: 2,
        nombre: 'María Fernanda',
        apellido: 'Gutiérrez Sánchez',
        numeroCedula: '6102207891003E',
        numeroTelefono: '89262853',
        fechaIngresoPrograma: '2016-08-01T00:00:00.000Z',
        estado: 3, // T3
      },
      {
        id: 3,
        nombre: 'Juan Pablo',
        apellido: 'Martínez Rodríguez',
        numeroCedula: '6102207981003E',
        numeroTelefono: '89262853',
        fechaIngresoPrograma: '2016-10-01T00:00:00.000Z',
        estado: 4, // Organico
      },
      {
        id: 4,
        nombre: 'Ana Sofía',
        apellido: 'Gómez Herrera',
        numeroCedula: '6102207891003E',
        numeroTelefono: '89262853',
        fechaIngresoPrograma: '2016-05-01T00:00:00.000Z',
        estado: 3, // T3
      },
      {
        id: 5,
        nombre: 'Luis Enrique',
        apellido: 'Pérez Morales',
        numeroCedula: '6102207891003E',
        numeroTelefono: '89262853',
        fechaIngresoPrograma: '2016-11-01T00:00:00.000Z',
        estado: 1, // T1
      },
    ];

    // INSERTANDO FINCAS
    const fincas = [
      {
        id: 1,
        nombre: 'La Esperanza',
        comunidad: 'limon 2',
        areaCacaoProduccion: 'ks41',
        areaCacaoDesarrollo: 'ksn1',
        produccionUltimoSiclo: '100KG',
        IDProductor: 1,
      },
      {
        id: 2,
        nombre: 'Monte Alegre',
        comunidad: 'limon 2',
        areaCacaoProduccion: 'ks41',
        areaCacaoDesarrollo: 'ksn1',
        produccionUltimoSiclo: '100KG',
        IDProductor: 1,
      },
      {
        id: 3,
        nombre: 'Los Cerezos',
        comunidad: 'limon 2',
        areaCacaoProduccion: 'ks41',
        areaCacaoDesarrollo: 'ksn1',
        produccionUltimoSiclo: '100KG',
        IDProductor: 2,
      },
      {
        id: 4,
        nombre: 'Santa Lucía',
        comunidad: 'limon 2',
        areaCacaoProduccion: 'ks41',
        areaCacaoDesarrollo: 'ksn1',
        produccionUltimoSiclo: '100KG',
        IDProductor: 3,
      },
      {
        id: 5,
        nombre: 'La bendición',
        comunidad: 'limon 2',
        areaCacaoProduccion: 'ks41',
        areaCacaoDesarrollo: 'ksn1',
        produccionUltimoSiclo: '100KG',
        IDProductor: 4,
      },
    ];

    // INSERTANDO SECCIONES FICHA
    const seccionesFicha = [
      {
        id: 1,
        nombre: 'Registro administrativo',
        descripcion: '',
      },
      {
        id: 2,
        nombre: 'Información de las parcelas',
        descripcion: '',
      },
      {
        id: 3,
        nombre: 'Manejo de plagas y enfermedades',
        descripcion: '',
      },
      {
        id: 4,
        nombre: 'Control de plagas y enfermedades',
        descripcion: '',
      },
      {
        id: 5,
        nombre: 'Aplicación de fertiliantes edaficos y foleares',
        descripcion: '',
      },
      {
        id: 6,
        nombre: 'Conservación de suelo, agua y medio ambiente',
        descripcion: '',
      },
      {
        id: 7,
        nombre: 'Riesgos de contaminación en la finca',
        descripcion: '',
      },
      {
        id: 8,
        nombre: 'Cosecha y pos cosecha del cacao',
        descripcion: '',
      },
      {
        id: 9,
        nombre: 'Transporte de la cosecha',
        descripcion: '',
      },
      {
        id: 10,
        nombre: 'Manejo de residuos',
        descripcion: '',
      },
      {
        id: 11,
        nombre: 'Responsabilidad social',
        descripcion: '',
      },
      {
        id: 12,
        nombre: 'Capacitación',
        descripcion: '',
      },
    ];

    // INSERTANDO DATOS
    const datos = [
      // Registro administrativo
      {
        id: 1,
        titulo: '¿El mapa de la finca está actualizado?',
        descripcion: '',
        IDSeccionesFicha: 1,
      },
      {
        id: 2,
        titulo: '¿Conserva los recibos o facturas de venta?',
        descripcion: '',
        IDSeccionesFicha: 1,
      },
      {
        id: 3,
        titulo: '¿El registro de cosecha está actualizado?',
        descripcion: '',
        IDSeccionesFicha: 1,
      },
      {
        id: 4,
        titulo: '¿El registro de actividades mensuales está al día?',
        descripcion: '',
        IDSeccionesFicha: 1,
      },
      {
        id: 5,
        titulo: '¿Se realizó el cronograma de actividades del ciclo?',
        descripcion: '',
        IDSeccionesFicha: 1,
      },

      // Información de las parcelas
      {
        id: 6,
        titulo: 'Nombre de la parcela',
        descripcion: '',
        IDSeccionesFicha: 2,
      },
      { id: 7, titulo: 'Área en Mz', descripcion: '', IDSeccionesFicha: 2 },
      { id: 8, titulo: 'Cultivo', descripcion: '', IDSeccionesFicha: 2 },
      {
        id: 9,
        titulo: 'Insumos utilizados',
        descripcion: '',
        IDSeccionesFicha: 2,
      },

      // Manejo de plagas y enfermedades
      {
        id: 10,
        titulo: 'Taltuzas',
        descripcion: 'Dato de la sección Manejo de plagas y Enfermedades',
        IDSeccionesFicha: 3,
      },
      {
        id: 11,
        titulo: 'Pulgones',
        descripcion: 'Dato de la sección Manejo de plagas y Enfermedades',
        IDSeccionesFicha: 3,
      },
      {
        id: 12,
        titulo: 'Hormigas',
        descripcion: 'Dato de la sección Manejo de plagas y Enfermedades',
        IDSeccionesFicha: 3,
      },
      {
        id: 13,
        titulo: 'Ardillas',
        descripcion: 'Dato de la sección Manejo de plagas y Enfermedades',
        IDSeccionesFicha: 3,
      },
      {
        id: 14,
        titulo: 'Monilia',
        descripcion: 'Dato de la sección Manejo de plagas y Enfermedades',
        IDSeccionesFicha: 3,
      },
      {
        id: 15,
        titulo: 'Mazorca negra',
        descripcion: 'Dato de la sección Manejo de plagas y Enfermedades',
        IDSeccionesFicha: 3,
      },
      {
        id: 16,
        titulo: 'Muerte súbita',
        descripcion: 'Dato de la sección Manejo de plagas y Enfermedades',
        IDSeccionesFicha: 3,
      },
      {
        id: 17,
        titulo: 'Mal de machete',
        descripcion: 'Dato de la sección Manejo de plagas y Enfermedades',
        IDSeccionesFicha: 3,
      },
      {
        id: 18,
        titulo: 'Otro',
        descripcion: 'Dato de la sección Manejo de plagas y Enfermedades',
        IDSeccionesFicha: 3,
      },

      // Control de plagas y enfermedades
      {
        id: 19,
        titulo: 'Producto Aplicado',
        descripcion: '',
        IDSeccionesFicha: 4,
      },
      { id: 20, titulo: 'Origen', descripcion: '', IDSeccionesFicha: 4 },
      {
        id: 21,
        titulo: 'Producto Utilizado',
        descripcion: '',
        IDSeccionesFicha: 4,
      },
      { id: 22, titulo: 'Cantidad/Mz', descripcion: '', IDSeccionesFicha: 4 },
      { id: 23, titulo: 'Veces /año', descripcion: '', IDSeccionesFicha: 4 },
      {
        id: 24,
        titulo: 'En que Cultivo lo utilizo',
        descripcion: '',
        IDSeccionesFicha: 4,
      },
      {
        id: 25,
        titulo: 'Para que Plaga o Enfermedad',
        descripcion: '',
        IDSeccionesFicha: 4,
      },

      // Aplicación de fertilizantes edáficos y foliares
      {
        id: 26,
        titulo: 'Nombre del abono',
        descripcion: '',
        IDSeccionesFicha: 5,
      },
      {
        id: 27,
        titulo: 'Cantidad aplicada',
        descripcion: '',
        IDSeccionesFicha: 5,
      },
      { id: 28, titulo: 'Origen abono', descripcion: '', IDSeccionesFicha: 5 },
      {
        id: 29,
        titulo: 'Mes en que aplico',
        descripcion: '',
        IDSeccionesFicha: 5,
      },
      {
        id: 30,
        titulo: '¿A qué cultivo?',
        descripcion: '',
        IDSeccionesFicha: 5,
      },
      {
        id: 31,
        titulo:
          '¿Tiene fertilizantes orgánicos almacenados actualmente en la finca?',
        descripcion: '',
        IDSeccionesFicha: 5,
      },

      // Conservación de suelo, agua y medio ambiente
      {
        id: 32,
        titulo: 'Barreras vivas',
        descripcion: '',
        IDSeccionesFicha: 6,
      },
      {
        id: 33,
        titulo: 'Barreras muertas',
        descripcion: '',
        IDSeccionesFicha: 6,
      },
      {
        id: 34,
        titulo: 'Siembra de cultivos en curvas a nivel',
        descripcion: '',
        IDSeccionesFicha: 6,
      },
      {
        id: 35,
        titulo: 'Cortinas rompe viento',
        descripcion: '',
        IDSeccionesFicha: 6,
      },
      {
        id: 36,
        titulo: 'Drenaje de cultivos',
        descripcion: '',
        IDSeccionesFicha: 6,
      },
      {
        id: 37,
        titulo: 'Coberturas vivas',
        descripcion: '',
        IDSeccionesFicha: 6,
      },
      {
        id: 38,
        titulo: 'Zonas de no aplicación',
        descripcion: '',
        IDSeccionesFicha: 6,
      },
      {
        id: 39,
        titulo: 'Construcción de terrazas',
        descripcion: '',
        IDSeccionesFicha: 6,
      },
      {
        id: 40,
        titulo: '¿Se protegen las fuentes de agua?',
        descripcion: '',
        IDSeccionesFicha: 6,
      },
      {
        id: 41,
        titulo: '¿Se observan problemas de erosión de suelo?',
        descripcion: '',
        IDSeccionesFicha: 6,
      },

      // Riesgos de contaminación en la finca
      {
        id: 42,
        titulo: 'Colinda con lotes convencionales',
        descripcion: '',
        IDSeccionesFicha: 7,
      },
      {
        id: 43,
        titulo: '¿Tiene zonas de amortiguamiento?',
        descripcion: '',
        IDSeccionesFicha: 7,
      },
      {
        id: 44,
        titulo: 'Produce otros cultivos con químicos en la finca?',
        descripcion: '',
        IDSeccionesFicha: 7,
      },
      {
        id: 45,
        titulo: '¿Tiene equipos para aplicación de agroquímicos?',
        descripcion: '',
        IDSeccionesFicha: 7,
      },
      {
        id: 46,
        titulo: '¿Almacena productos no permitidos en la finca?',
        descripcion: '',
        IDSeccionesFicha: 7,
      },
      {
        id: 47,
        titulo:
          '¿Usa aparatos de aplicación destinados solo para la producción orgánica?',
        descripcion: '',
        IDSeccionesFicha: 7,
      },
      {
        id: 48,
        titulo:
          '¿Cuenta con zonas de amortiguamiento en la parcela certificada?',
        descripcion: '',
        IDSeccionesFicha: 7,
      },
      {
        id: 49,
        titulo: '¿Existe otro riesgo de contaminación?',
        descripcion: '',
        IDSeccionesFicha: 7,
      },

      // Cosecha y pos cosecha del cacao
      {
        id: 50,
        titulo: 'Frecuencia de corte',
        descripcion: '',
        IDSeccionesFicha: 8,
      },
      {
        id: 51,
        titulo: 'Herramientas usadas',
        descripcion: '',
        IDSeccionesFicha: 8,
      },
      {
        id: 52,
        titulo: 'Material usado para envase',
        descripcion: '',
        IDSeccionesFicha: 8,
      },
      {
        id: 53,
        titulo: 'Precio de compra',
        descripcion: '',
        IDSeccionesFicha: 8,
      },
      { id: 54, titulo: 'Mano de obra', descripcion: '', IDSeccionesFicha: 8 },

      // Transporte de la cosecha
      {
        id: 55,
        titulo: '¿Contrata transporte?',
        descripcion: '',
        IDSeccionesFicha: 9,
      },

      // Manejo de residuos
      {
        id: 56,
        titulo: 'Cáscara de cacao',
        descripcion: '',
        IDSeccionesFicha: 10,
      },
      {
        id: 57,
        titulo: 'Rastrojo de poda',
        descripcion: '',
        IDSeccionesFicha: 10,
      },
      {
        id: 58,
        titulo: 'Baba de cacao',
        descripcion: '',
        IDSeccionesFicha: 10,
      },
      {
        id: 59,
        titulo: 'Residuos de viveros',
        descripcion: '',
        IDSeccionesFicha: 10,
      },
      {
        id: 60,
        titulo: 'Residuos de plaguicidas',
        descripcion: '',
        IDSeccionesFicha: 10,
      },
      {
        id: 61,
        titulo: 'Mazorcas Enfermas',
        descripcion: '',
        IDSeccionesFicha: 10,
      },
      {
        id: 62,
        titulo: 'Sacos y bolsas cosecha',
        descripcion: '',
        IDSeccionesFicha: 10,
      },
      { id: 63, titulo: 'Otro', descripcion: '', IDSeccionesFicha: 10 },
      // Responsabilidad social
      {
        id: 64,
        titulo: '¿Cuántos empleados fijos trabajan en la propiedad?',
        descripcion: '',
        IDSeccionesFicha: 11,
      },
      {
        id: 65,
        titulo: '¿Cuántos empleados temporales trabajan en la propiedad?',
        descripcion: '',
        IDSeccionesFicha: 11,
      },
      {
        id: 66,
        titulo: '¿Cuál es el salario para los trabajadores fijos?',
        descripcion: '',
        IDSeccionesFicha: 11,
      },
      {
        id: 67,
        titulo: '¿Cuál es el salario para los trabajadores temporales?',
        descripcion: '',
        IDSeccionesFicha: 11,
      },
      {
        id: 68,
        titulo:
          '¿La educación escolar no se perjudica, aunque los niños estén apoyando las actividades de campo?',
        descripcion: '',
        IDSeccionesFicha: 11,
      },
      {
        id: 69,
        titulo: '¿Se garantiza la seguridad en el trabajo?',
        descripcion: '',
        IDSeccionesFicha: 11,
      },

      // Capacitación
      {
        id: 70,
        titulo: 'Conoce el reglamento interno',
        descripcion: '',
        IDSeccionesFicha: 12,
      },
      {
        id: 71,
        titulo: 'Ha recibido capacitaciones',
        descripcion: '',
        IDSeccionesFicha: 12,
      },
    ];

    try {
      await this.productor.createMany({
        data: productores,
      });

      await this.finca.createMany({
        data: fincas,
      });

      await this.seccionesFicha.createMany({
        data: seccionesFicha,
      });

      await this.dato.createMany({
        data: datos,
      });
      console.log('Database seeded successfully');
      return {
        message: 'Database seeded successfully',
      };
    } catch (error) {
      console.error('Error seeding database:', error);
      return {
        error: error.message,
        message: 'Error seeding database',
      };
    }
  }
}
