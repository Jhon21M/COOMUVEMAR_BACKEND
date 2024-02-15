import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DashboardData } from './interfaces';
import { FiltroDashDto } from './dto';

@Injectable()
export class DashboardService {
  constructor(private prismaService: PrismaService) {}

  // create(createDashboardDto: CreateDashboardDto) {
  //   return 'This action adds a new dashboard';
  // }

  // findAll() {
  //   return `This action returns all dashboard`;
  // }

  async getDashboardData(fecha: FiltroDashDto): Promise<DashboardData> {
    // Inspector DATA
    const totalInspectors = await this.getTotalInspectors();
    const activeInspectorsLastMonth = await this.getActiveInspectorsLastMonth(
      fecha.fechaInicio,
      fecha.fechaFinal,
    );
    const inactiveInspectors = await this.getInactiveInspectors(
      fecha.fechaInicio,
      fecha.fechaFinal,
    );

    // Ficha DATA
    const fichasAprobadas = await this.getfichaAprobadas();
    const fichasPendientes = await this.getFichasPendientes();
    const nuevasFichas = await this.getNuevasFichas();
    const nuevosUsuarios = await this.getNuevosUsuarios();

    return {
      totalInspectors,
      activeInspectorsLastMonth,
      inactiveInspectors,
      fichasAprobadas,
      fichasPendientes,
      nuevasFichas,
      nuevosUsuarios,
    };
  }

  private async getTotalInspectors(): Promise<number> {
    return this.prismaService.trabajador.count();
  }

  private async getActiveInspectorsLastMonth(
    nombreMesInicio: string,
    nombreMesFinal: string,
  ): Promise<number> {
    const mesesDelAnio = [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre',
    ];

    // Obtener el índice del mes de inicio y final
    const indiceMesInicio = mesesDelAnio.findIndex(
      (mes) => mes.toLowerCase() === nombreMesInicio.toLowerCase(),
    );
    const indiceMesFinal = mesesDelAnio.findIndex(
      (mes) => mes.toLowerCase() === nombreMesFinal.toLowerCase(),
    );

    console.log('imprimiendo los indices\n', indiceMesInicio, indiceMesFinal);

    // Verificar si se encontraron los nombres de mes válidos
    if (indiceMesInicio === -1 || indiceMesFinal === -1) {
      throw new Error('Nombre de mes inválido');
    }

    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    console.log('Imprimiendo mes pasado\n', lastMonth);
    lastMonth.setMonth(indiceMesInicio, 1); //
    console.log(
      'Imprimiendo mes pasado despues de enviar el indice\n',
      lastMonth,
    );

    // Obtener la fecha de finalización del mes pasado
    const fechaFinal = new Date();
    fechaFinal.setMonth(indiceMesFinal + 1, 0); // Establecer el mes de finalización

    console.log(lastMonth);
    console.log(fechaFinal);

    const fichasPorInspector = await this.prismaService.ficha.groupBy({
      by: ['IDTrabajador'],
      where: {
        createdAt: {
          gte: lastMonth,
          lt: fechaFinal,
        },
      },
    });

    const cantidadInspectores = fichasPorInspector.length;
    return cantidadInspectores;
  }

  private async getInactiveInspectors(
    nombreMesInicio: string,
    nombreMesFinal: string,
  ): Promise<number> {
    const mesesDelAnio = [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre',
    ];

    // Obtener el índice del mes de inicio y final
    const indiceMesInicio = mesesDelAnio.findIndex(
      (mes) => mes.toLowerCase() === nombreMesInicio.toLowerCase(),
    );
    const indiceMesFinal = mesesDelAnio.findIndex(
      (mes) => mes.toLowerCase() === nombreMesFinal.toLowerCase(),
    );

    console.log('Imprimiendo los indices\n', indiceMesInicio, indiceMesFinal);

    // Verificar si se encontraron los nombres de mes válidos
    if (indiceMesInicio === -1 || indiceMesFinal === -1) {
      throw new Error('Nombre de mes inválido');
    }

    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    console.log('Imprimiendo mes pasado\n', lastMonth);
    lastMonth.setMonth(indiceMesInicio, 1); //

    // Obtener la fecha de finalización del mes pasado
    const fechaFinal = new Date();
    fechaFinal.setMonth(indiceMesFinal + 1, 0); // Establecer el mes de finalización

    console.log(lastMonth);
    console.log(fechaFinal);

    const fichasPorInspector = await this.prismaService.ficha.groupBy({
      by: ['IDTrabajador'],
      where: {
        createdAt: {
          gte: lastMonth,
          lt: fechaFinal,
        },
      },
    });
    const cantidadInspectores = fichasPorInspector.length;
    return cantidadInspectores;
  }

  private async getfichaAprobadas(): Promise<number> {
    const fichasAprobadas = await this.prismaService.ficha.findMany({
      where: {
        Desicion: {
          some: {
            desicion: 'Aplobado',
          },
        },
      },
    });

    return fichasAprobadas.length;
  }

  private async getNuevasFichas(): Promise<number> {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const nuevasFichas = await this.prismaService.ficha.findMany({
      where: {
        createdAt: {
          gte: lastMonth,
        },
      },
    });
    return nuevasFichas.length;
  }

  private async getCambiosEnSecciones() {}

  private async getNuevosUsuarios(): Promise<number> {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const nuevosUsuarios = await this.prismaService.usuario.findMany({
      where: {
        createAt: {
          gte: lastMonth, // O cualquier criterio de tiempo que defina "nuevos usuarios"
        },
      },
    });
    return nuevosUsuarios.length;
  }

  private async getFichasPendientes(): Promise<number> {
    const fichasPendientes = await this.prismaService.ficha.findMany({
      where: {
        Desicion: {
          none: {}, // Sin decisiones (pendientes)
        },
      },
    });
    return fichasPendientes.length;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} dashboard`;
  // }

  // update(id: number, updateDashboardDto: UpdateDashboardDto) {
  //   return `This action updates a #${id} dashboard`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} dashboard`;
  // }
}
