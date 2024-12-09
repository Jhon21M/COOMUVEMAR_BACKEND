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
        nombre: 'Aplicación de fertilizantes edaficos y foleares',
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

    // INSERTANDO Insumos
    const insumos = [
      {
        producto_aplicado: 'Compost',
        tipo: 'Fertilizante Orgánico',
        descripcion:
          'Materia orgánica fermentada utilizada para mejorar la fertilidad del suelo.',
        permitido: true,
      },
      {
        producto_aplicado: 'Estiércol bien compostado',
        tipo: 'Fertilizante Orgánico',
        descripcion:
          'Residuo animal procesado y estabilizado, rico en nutrientes.',
        permitido: true,
      },
      {
        producto_aplicado: 'Humus de lombriz',
        tipo: 'Fertilizante Orgánico',
        descripcion:
          'Producto derivado de la lombricultura rico en nutrientes.',
        permitido: true,
      },
      {
        producto_aplicado: 'Guano de isla',
        tipo: 'Fertilizante Orgánico',
        descripcion:
          'Excrementos de aves marinas usados como fertilizante natural.',
        permitido: true,
      },
      {
        producto_aplicado: 'Abonos verdes',
        tipo: 'Fertilizante Orgánico',
        descripcion:
          'Cultivos sembrados y enterrados para mejorar la fertilidad del suelo.',
        permitido: true,
      },
      {
        producto_aplicado: 'Biofertilizantes líquidos',
        tipo: 'Fertilizante Orgánico',
        descripcion:
          'Soluciones orgánicas como bocashi líquido para enriquecer el suelo.',
        permitido: true,
      },
      {
        producto_aplicado: 'Extracto de neem',
        tipo: 'Plaguicida Natural',
        descripcion:
          'Extracto vegetal utilizado para el control de insectos chupadores.',
        permitido: true,
      },
      {
        producto_aplicado: 'Jabón potásico',
        tipo: 'Plaguicida Natural',
        descripcion: 'Solución jabonosa para eliminar plagas de cuerpo blando.',
        permitido: true,
      },
      {
        producto_aplicado: 'Aceite mineral',
        tipo: 'Plaguicida Natural',
        descripcion:
          'Producto utilizado de manera específica para plagas en cultivos.',
        permitido: true,
      },
      {
        producto_aplicado: 'Bacillus thuringiensis (BT)',
        tipo: 'Plaguicida Natural',
        descripcion: 'Bacteria natural para el control de plagas lepidópteras.',
        permitido: true,
      },
      {
        producto_aplicado: 'Fungicida de azufre elemental',
        tipo: 'Plaguicida Natural',
        descripcion:
          'Azufre usado como fungicida para controlar enfermedades en plantas.',
        permitido: true,
      },
      {
        producto_aplicado: 'Trichoderma',
        tipo: 'Plaguicida Natural',
        descripcion:
          'Hongo benéfico utilizado para controlar enfermedades del suelo.',
        permitido: true,
      },
      {
        producto_aplicado: 'Cal agrícola',
        tipo: 'Acondicionador del Suelo',
        descripcion: 'Carbonato de calcio para corregir la acidez del suelo.',
        permitido: true,
      },
      {
        producto_aplicado: 'Roca fosfórica',
        tipo: 'Acondicionador del Suelo',
        descripcion: 'Fuente natural de fósforo para el suelo.',
        permitido: true,
      },
      {
        producto_aplicado: 'Sulfato de potasio natural',
        tipo: 'Acondicionador del Suelo',
        descripcion:
          'Potasa natural usada para mejorar los niveles de potasio en el suelo.',
        permitido: true,
      },
      {
        producto_aplicado: 'Cenizas vegetales',
        tipo: 'Acondicionador del Suelo',
        descripcion:
          'Residuos de madera o plantas usados como enmienda para el suelo.',
        permitido: true,
      },
      {
        producto_aplicado: 'Mariquitas',
        tipo: 'Controlador Biológico',
        descripcion: 'Insecto benéfico que controla plagas como los pulgones.',
        permitido: true,
      },
      {
        producto_aplicado: 'Crisopas',
        tipo: 'Controlador Biológico',
        descripcion:
          'Depredadoras naturales que eliminan plagas como trips o ácaros.',
        permitido: true,
      },
      {
        producto_aplicado: 'Beauveria bassiana',
        tipo: 'Controlador Biológico',
        descripcion:
          'Hongo benéfico utilizado para controlar plagas de insectos.',
        permitido: true,
      },
      {
        producto_aplicado: 'Caldo sulfocálcico',
        tipo: 'Otros Insumos',
        descripcion: 'Preparación casera para controlar hongos y ácaros.',
        permitido: true,
      },
      {
        producto_aplicado: 'Caldo bordelés',
        tipo: 'Otros Insumos',
        descripcion: 'Mezcla de sulfato de cobre y cal para controlar hongos.',
        permitido: true,
      },
      {
        producto_aplicado: 'Caldo de ceniza',
        tipo: 'Otros Insumos',
        descripcion: 'Solución de ceniza para combatir plagas y enfermedades.',
        permitido: true,
      },
      {
        producto_aplicado: 'Biochar',
        tipo: 'Otros Insumos',
        descripcion:
          'Carbón vegetal usado para mejorar la estructura del suelo.',
        permitido: true,
      },
      {
        producto_aplicado: 'Extractos de algas',
        tipo: 'Otros Insumos',
        descripcion: 'Suplementos líquidos ricos en minerales y fitohormonas.',
        permitido: true,
      },
    ];

    // INSERTANDO Control de Plagas
    const ControlPlagas = [
      {
        producto_aplicado: 'Trampas mecánicas',
        tipo: 'Control Mecánico',
        descripcion: 'Trampas para capturar plagas como ardillas y taltuzas.',
        permitido: true,
      },
      {
        producto_aplicado: 'Aullamiento con perros',
        tipo: 'Control Biológico',
        descripcion:
          'Uso de perros para espantar roedores y ardillas en las parcelas.',
        permitido: true,
      },
      {
        producto_aplicado: 'Extracto de neem',
        tipo: 'Insecticida Natural',
        descripcion: 'Insecticida natural para controlar pulgones y hormigas.',
        permitido: true,
      },
      {
        producto_aplicado: 'Bacillus thuringiensis (BT)',
        tipo: 'Control Biológico',
        descripcion:
          'Bacteria utilizada para controlar plagas como taltuzas y gusanos.',
        permitido: true,
      },
      {
        producto_aplicado: 'Trichoderma',
        tipo: 'Control Biológico',
        descripcion:
          'Hongo benéfico usado contra Monilia y enfermedades fúngicas.',
        permitido: true,
      },
      {
        producto_aplicado: 'Caldo sulfocálcico',
        tipo: 'Fungicida Natural',
        descripcion: 'Preparado natural para tratar Monilia y Mazorca negra.',
        permitido: true,
      },
      {
        producto_aplicado: 'Caldo bordelés',
        tipo: 'Fungicida Natural',
        descripcion: 'Mezcla usada para controlar hongos como Monilia.',
        permitido: true,
      },
      {
        producto_aplicado: 'Aceite mineral',
        tipo: 'Insecticida Natural',
        descripcion: 'Control de plagas específicas como pulgones y hormigas.',
        permitido: true,
      },
      {
        producto_aplicado: 'Crisopas',
        tipo: 'Control Biológico',
        descripcion: 'Insectos depredadores naturales para controlar pulgones.',
        permitido: true,
      },
      {
        producto_aplicado: 'Podas sanitarias',
        tipo: 'Control Cultural',
        descripcion:
          'Eliminación de ramas o frutos infectados por Monilia o Mazorca negra.',
        permitido: true,
      },
      {
        producto_aplicado: 'Caldo de ceniza',
        tipo: 'Fungicida Natural',
        descripcion: 'Tratamiento natural para enfermedades como Monilia.',
        permitido: true,
      },
      {
        producto_aplicado: 'Hongos benéficos',
        tipo: 'Control Biológico',
        descripcion:
          'Control de hongos patógenos en el suelo, como el Mal de machete.',
        permitido: true,
      },
      {
        producto_aplicado: 'Biochar',
        tipo: 'Mejorador del Suelo',
        descripcion: 'Mejora la salud del suelo para prevenir enfermedades.',
        permitido: true,
      },
      {
        producto_aplicado: 'Cultivos de cobertura',
        tipo: 'Control Cultural',
        descripcion:
          'Previenen el desarrollo de plagas al reducir el espacio para su proliferación.',
        permitido: true,
      },
      {
        producto_aplicado: 'Control manual de taltuzas',
        tipo: 'Control Mecánico',
        descripcion: 'Eliminación manual de taltuzas y madrigueras.',
        permitido: true,
      },
      {
        producto_aplicado: 'Extracto de ajo',
        tipo: 'Insecticida Natural',
        descripcion: 'Repelente natural para hormigas y otras plagas.',
        permitido: true,
      },
      {
        producto_aplicado: 'Mariquitas',
        tipo: 'Control Biológico',
        descripcion: 'Control biológico de pulgones en las plantas.',
        permitido: true,
      },
      {
        producto_aplicado: 'Rotación de cultivos',
        tipo: 'Control Cultural',
        descripcion:
          'Práctica para reducir la acumulación de patógenos en el suelo.',
        permitido: true,
      },
      {
        producto_aplicado: 'Eliminación de mazorcas enfermas',
        tipo: 'Control Sanitario',
        descripcion:
          'Práctica para reducir la propagación de Monilia y otras enfermedades.',
        permitido: true,
      },
    ];

    // Fertilizantes edáficos y foliares
    const fertilizantes = [
      {
        producto_aplicado: 'Compost',
        tipo: 'Fertilizante Orgánico',
        descripcion:
          'Materia orgánica descompuesta utilizada para mejorar el suelo.',
        permitido: true,
      },
      {
        producto_aplicado: 'Estiércol bien compostado',
        tipo: 'Fertilizante Orgánico',
        descripcion: 'Abono derivado de estiércol tratado adecuadamente.',
        permitido: true,
      },
      {
        producto_aplicado: 'Humus de lombriz',
        tipo: 'Fertilizante Orgánico',
        descripcion: 'Producto derivado del compostaje con lombrices.',
        permitido: true,
      },
      {
        producto_aplicado: 'Guano de isla',
        tipo: 'Fertilizante Orgánico',
        descripcion:
          'Fertilizante rico en nitrógeno derivado de excrementos de aves marinas.',
        permitido: true,
      },
      {
        producto_aplicado: 'Abonos verdes',
        tipo: 'Fertilizante Orgánico',
        descripcion:
          'Plantas sembradas y descompuestas directamente en el suelo.',
        permitido: true,
      },
      {
        producto_aplicado: 'Bocashi líquido',
        tipo: 'Biofertilizante Líquido',
        descripcion:
          'Biofertilizante líquido fermentado con microorganismos benéficos.',
        permitido: true,
      },
      {
        producto_aplicado: 'Cal agrícola',
        tipo: 'Acondicionador del Suelo',
        descripcion: 'Producto para ajustar el pH del suelo de forma orgánica.',
        permitido: true,
      },
      {
        producto_aplicado: 'Roca fosfórica',
        tipo: 'Acondicionador del Suelo',
        descripcion: 'Fuente natural de fósforo para suelos.',
        permitido: true,
      },
      {
        producto_aplicado: 'Sulfato de potasio natural',
        tipo: 'Acondicionador del Suelo',
        descripcion: 'Fuente natural de potasio para cultivos.',
        permitido: true,
      },
      {
        producto_aplicado: 'Biochar',
        tipo: 'Acondicionador del Suelo',
        descripcion:
          'Carbón vegetal que mejora la retención de agua y nutrientes.',
        permitido: true,
      },
      {
        producto_aplicado: 'Extractos de algas',
        tipo: 'Fertilizante Foliar',
        descripcion: 'Bioestimulante derivado de algas marinas.',
        permitido: true,
      },
      {
        producto_aplicado: 'Cenizas vegetales',
        tipo: 'Fertilizante Orgánico',
        descripcion: 'Fuente de potasio y micronutrientes.',
        permitido: true,
      },
      {
        producto_aplicado: 'Microorganismos eficientes (EM)',
        tipo: 'Biofertilizante',
        descripcion: 'Mezcla de microorganismos que mejora la salud del suelo.',
        permitido: true,
      },
      {
        producto_aplicado: 'Caldo de ceniza',
        tipo: 'Biofertilizante',
        descripcion:
          'Solución rica en nutrientes minerales para uso foliar o edáfico.',
        permitido: true,
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

      await this.productosUtilizados.createMany({
        data: insumos,
      });

      await this.productosUtilizados.createMany({
        data: ControlPlagas,
      });

      await this.productosUtilizados.createMany({
        data: fertilizantes,
      });

      console.log('Database seeded successfully');
      return {
        message: 'Database seeded successfully',
      };
    } catch (error) {
      console.error('Error seeding database:', error);
      return {
        error: error,
        message: 'Error seeding database',
      };
    }
  }
}
