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
        nombre: 'Carlos Alberto',
        apellido: 'Ramírez López',
        numeroCedula: '6102207991013E',
        numeroTelefono: '89262853',
        fechaIngresoPrograma: '2016-02-01T00:00:00.000Z',
        estado: '2', // T2
      },
      {
        nombre: 'María Fernanda',
        apellido: 'Gutiérrez Sánchez',
        numeroCedula: '6102207891003E',
        numeroTelefono: '89262853',
        fechaIngresoPrograma: '2016-08-01T00:00:00.000Z',
        estado: '3', // T3
      },
      {
        nombre: 'Juan Pablo',
        apellido: 'Martínez Rodríguez',
        numeroCedula: '6102207981003E',
        numeroTelefono: '89262853',
        fechaIngresoPrograma: '2016-10-01T00:00:00.000Z',
        estado: '4', // Organico
      },
      {
        nombre: 'Ana Sofía',
        apellido: 'Gómez Herrera',
        numeroCedula: '6102207891003E',
        numeroTelefono: '89262853',
        fechaIngresoPrograma: '2016-05-01T00:00:00.000Z',
        estado: '3', // T3
      },
      {
        nombre: 'Luis Enrique',
        apellido: 'Pérez Morales',
        numeroCedula: '6102207891003E',
        numeroTelefono: '89262853',
        fechaIngresoPrograma: '2016-11-01T00:00:00.000Z',
        estado: '1', // T1
      },
    ];

    // INSERTANDO FINCAS
    const fincas = [
      {
        nombre: 'La Esperanza',
        comunidad: 'limon 2',
        areaCacaoProduccion: 'ks41',
        areaCacaoDesarrollo: 'ksn1',
        produccionUltimoSiclo: '100KG',
        IDProductor: 1,
      },
      {
        nombre: 'Monte Alegre',
        comunidad: 'limon 2',
        areaCacaoProduccion: 'ks41',
        areaCacaoDesarrollo: 'ksn1',
        produccionUltimoSiclo: '100KG',
        IDProductor: 1,
      },
      {
        nombre: 'Los Cerezos',
        comunidad: 'limon 2',
        areaCacaoProduccion: 'ks41',
        areaCacaoDesarrollo: 'ksn1',
        produccionUltimoSiclo: '100KG',
        IDProductor: 2,
      },
      {
        nombre: 'Santa Lucía',
        comunidad: 'limon 2',
        areaCacaoProduccion: 'ks41',
        areaCacaoDesarrollo: 'ksn1',
        produccionUltimoSiclo: '100KG',
        IDProductor: 3,
      },
      {
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
        nombre: 'Registros administrativos',
        descripcion: '',
      },
      {
        nombre: 'Información de las parcelas',
        descripcion: '',
      },
      {
        nombre: 'Manejo de plagas y enfermedades',
        descripcion: '',
      },
      {
        nombre: 'Control de plagas y enfermedades',
        descripcion: '',
      },
      {
        nombre: 'Aplicación de fertiliantes edaficos y foleares',
        descripcion: '',
      },
      {
        nombre: 'Conservación de suelo, agua y medio ambiente',
        descripcion: '',
      },
      {
        nombre: 'Riesgos de contaminación en la finca',
        descripcion: '',
      },
      {
        nombre: 'Cosecha y pos cosecha del cacao',
        descripcion: '',
      },
      {
        nombre: 'Transporte de la cosecha',
        descripcion: '',
      },
      {
        nombre: 'Manejo de residuos',
        descripcion: '',
      },
      {
        nombre: 'Responsabilidad social',
        descripcion: '',
      },
      {
        nombre: 'Capacitación',
        descripcion: '',
      },
    ];

    // INSERTANDO DATOS
    const datos = [
      // Registro administrativo
      {
        titulo: '¿El mapa de la finca está actualizado?',
        descripcion: '',
        IDSeccionesFicha: 1,
      },
      {
        titulo: '¿Conserva los recibos o facturas de venta?',
        descripcion: '',
        IDSeccionesFicha: 1,
      },
      {
        titulo: '¿El registro de cosecha está actualizado?',
        descripcion: '',
        IDSeccionesFicha: 1,
      },
      {
        titulo: '¿El registro de actividades mensuales está al día?',
        descripcion: '',
        IDSeccionesFicha: 1,
      },
      {
        titulo: '¿Se realizó el cronograma de actividades del ciclo?',
        descripcion: '',
        IDSeccionesFicha: 1,
      },

      // Información de las parcelas
      {
        titulo: 'Nombre de la parcela',
        descripcion: '',
        IDSeccionesFicha: 2,
      },
      { titulo: 'Área en Mz', descripcion: '', IDSeccionesFicha: 2 },
      { titulo: 'Cultivo', descripcion: '', IDSeccionesFicha: 2 },
      {
        titulo: 'Insumos utilizados',
        descripcion: '',
        IDSeccionesFicha: 2,
      },

      // Manejo de plagas y enfermedades
      {
        titulo: 'Taltuzas',
        descripcion: 'Dato de la sección Manejo de plagas y Enfermedades',
        IDSeccionesFicha: 3,
      },
      {
        titulo: 'Pulgones',
        descripcion: 'Dato de la sección Manejo de plagas y Enfermedades',
        IDSeccionesFicha: 3,
      },
      {
        titulo: 'Hormigas',
        descripcion: 'Dato de la sección Manejo de plagas y Enfermedades',
        IDSeccionesFicha: 3,
      },
      {
        titulo: 'Ardillas',
        descripcion: 'Dato de la sección Manejo de plagas y Enfermedades',
        IDSeccionesFicha: 3,
      },
      {
        titulo: 'Monilia',
        descripcion: 'Dato de la sección Manejo de plagas y Enfermedades',
        IDSeccionesFicha: 3,
      },
      {
        titulo: 'Mazorca negra',
        descripcion: 'Dato de la sección Manejo de plagas y Enfermedades',
        IDSeccionesFicha: 3,
      },
      {
        titulo: 'Muerte súbita',
        descripcion: 'Dato de la sección Manejo de plagas y Enfermedades',
        IDSeccionesFicha: 3,
      },
      {
        titulo: 'Mal de machete',
        descripcion: 'Dato de la sección Manejo de plagas y Enfermedades',
        IDSeccionesFicha: 3,
      },
      {
        titulo: 'Otro',
        descripcion: 'Dato de la sección Manejo de plagas y Enfermedades',
        IDSeccionesFicha: 3,
      },

      // Control de plagas y enfermedades
      {
        titulo: 'Producto Aplicado',
        descripcion: '',
        IDSeccionesFicha: 4,
      },
      { titulo: 'Origen', descripcion: '', IDSeccionesFicha: 4 },
      {
        titulo: 'Producto Utilizado',
        descripcion: '',
        IDSeccionesFicha: 4,
      },
      { titulo: 'Cantidad/Mz', descripcion: '', IDSeccionesFicha: 4 },
      { titulo: 'Veces /año', descripcion: '', IDSeccionesFicha: 4 },
      {
        titulo: 'En que Cultivo lo utilizo',
        descripcion: '',
        IDSeccionesFicha: 4,
      },
      {
        titulo: 'Para que Plaga o Enfermedad',
        descripcion: '',
        IDSeccionesFicha: 4,
      },

      // Aplicación de fertilizantes edáficos y foliares
      {
        titulo: 'Nombre del abono',
        descripcion: '',
        IDSeccionesFicha: 5,
      },
      {
        titulo: 'Cantidad aplicada',
        descripcion: '',
        IDSeccionesFicha: 5,
      },
      { titulo: 'Origen abono', descripcion: '', IDSeccionesFicha: 5 },
      {
        titulo: 'Mes en que aplico',
        descripcion: '',
        IDSeccionesFicha: 5,
      },
      {
        titulo: '¿A qué cultivo?',
        descripcion: '',
        IDSeccionesFicha: 5,
      },
      {
        titulo:
          '¿Tiene fertilizantes orgánicos almacenados actualmente en la finca?',
        descripcion: '',
        IDSeccionesFicha: 5,
      },

      // Conservación de suelo, agua y medio ambiente
      {
        titulo: 'Barreras vivas',
        descripcion: '',
        IDSeccionesFicha: 6,
      },
      {
        titulo: 'Barreras muertas',
        descripcion: '',
        IDSeccionesFicha: 6,
      },
      {
        titulo: 'Siembra de cultivos en curvas a nivel',
        descripcion: '',
        IDSeccionesFicha: 6,
      },
      {
        titulo: 'Cortinas rompe viento',
        descripcion: '',
        IDSeccionesFicha: 6,
      },
      {
        titulo: 'Drenaje de cultivos',
        descripcion: '',
        IDSeccionesFicha: 6,
      },
      {
        titulo: 'Coberturas vivas',
        descripcion: '',
        IDSeccionesFicha: 6,
      },
      {
        titulo: 'Zonas de no aplicación',
        descripcion: '',
        IDSeccionesFicha: 6,
      },
      {
        titulo: 'Construcción de terrazas',
        descripcion: '',
        IDSeccionesFicha: 6,
      },
      {
        titulo: '¿Se protegen las fuentes de agua?',
        descripcion: '',
        IDSeccionesFicha: 6,
      },
      {
        titulo: '¿Se observan problemas de erosión de suelo?',
        descripcion: '',
        IDSeccionesFicha: 6,
      },

      // Riesgos de contaminación en la finca
      {
        titulo: 'Colinda con lotes convencionales',
        descripcion: '',
        IDSeccionesFicha: 7,
      },
      {
        titulo: '¿Tiene zonas de amortiguamiento?',
        descripcion: '',
        IDSeccionesFicha: 7,
      },
      {
        titulo: 'Produce otros cultivos con químicos en la finca?',
        descripcion: '',
        IDSeccionesFicha: 7,
      },
      {
        titulo: '¿Tiene equipos para aplicación de agroquímicos?',
        descripcion: '',
        IDSeccionesFicha: 7,
      },
      {
        titulo: '¿Almacena productos no permitidos en la finca?',
        descripcion: '',
        IDSeccionesFicha: 7,
      },
      {
        titulo:
          '¿Usa aparatos de aplicación destinados solo para la producción orgánica?',
        descripcion: '',
        IDSeccionesFicha: 7,
      },
      {
        titulo:
          '¿Cuenta con zonas de amortiguamiento en la parcela certificada?',
        descripcion: '',
        IDSeccionesFicha: 7,
      },
      {
        titulo: '¿Existe otro riesgo de contaminación?',
        descripcion: '',
        IDSeccionesFicha: 7,
      },

      // Cosecha y pos cosecha del cacao
      {
        titulo: 'Frecuencia de corte',
        descripcion: '',
        IDSeccionesFicha: 8,
      },
      {
        titulo: 'Herramientas usadas',
        descripcion: '',
        IDSeccionesFicha: 8,
      },
      {
        titulo: 'Material usado para envase',
        descripcion: '',
        IDSeccionesFicha: 8,
      },
      {
        titulo: 'Precio de compra',
        descripcion: '',
        IDSeccionesFicha: 8,
      },
      { titulo: 'Mano de obra', descripcion: '', IDSeccionesFicha: 8 },

      // Transporte de la cosecha
      {
        titulo: '¿Contrata transporte?',
        descripcion: '',
        IDSeccionesFicha: 9,
      },

      // Manejo de residuos
      {
        titulo: 'Cáscara de cacao',
        descripcion: '',
        IDSeccionesFicha: 10,
      },
      {
        titulo: 'Rastrojo de poda',
        descripcion: '',
        IDSeccionesFicha: 10,
      },
      {
        titulo: 'Baba de cacao',
        descripcion: '',
        IDSeccionesFicha: 10,
      },
      {
        titulo: 'Residuos de viveros',
        descripcion: '',
        IDSeccionesFicha: 10,
      },
      {
        titulo: 'Residuos de plaguicidas',
        descripcion: '',
        IDSeccionesFicha: 10,
      },
      {
        titulo: 'Mazorcas Enfermas',
        descripcion: '',
        IDSeccionesFicha: 10,
      },
      {
        titulo: 'Sacos y bolsas cosecha',
        descripcion: '',
        IDSeccionesFicha: 10,
      },
      { titulo: 'Otro', descripcion: '', IDSeccionesFicha: 10 },

      // Responsabilidad social
      {
        titulo: '¿Cuántos empleados fijos trabajan en la propiedad?',
        descripcion: '',
        IDSeccionesFicha: 11,
      },
      {
        titulo: '¿Cuántos empleados temporales trabajan en la propiedad?',
        descripcion: '',
        IDSeccionesFicha: 11,
      },
      {
        titulo: '¿Cuál es el salario para los trabajadores fijos?',
        descripcion: '',
        IDSeccionesFicha: 11,
      },
      {
        titulo: '¿Cuál es el salario para los trabajadores temporales?',
        descripcion: '',
        IDSeccionesFicha: 11,
      },
      {
        titulo:
          '¿La educación escolar no se perjudica, aunque los niños estén apoyando las actividades de campo?',
        descripcion: '',
        IDSeccionesFicha: 11,
      },
      {
        titulo: '¿Se garantiza la seguridad en el trabajo?',
        descripcion: '',
        IDSeccionesFicha: 11,
      },

      // Capacitación
      {
        titulo: 'Conoce el reglamento interno',
        descripcion: '',
        IDSeccionesFicha: 12,
      },
      {
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
