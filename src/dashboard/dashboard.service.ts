import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DashboardData } from './interfaces';

@Injectable()
export class DashboardService {
  constructor(private prismaService: PrismaService) {}

  // create(createDashboardDto: CreateDashboardDto) {
  //   return 'This action adds a new dashboard';
  // }

  // findAll() {
  //   return `This action returns all dashboard`;
  // }

  async getDashboardData(): Promise<DashboardData> {
    // Inspector DATA
    const totalInspectors = await this.getTotalInspectors();
    const activeInspectorsLastMonth = await this.getActiveInspectorsLastMonth();
    const inactiveInspectors = await this.getInactiveInspectors();

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
    return this.prismaService.inspector.count();
  }

  private async getActiveInspectorsLastMonth(): Promise<number> {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    console.log(lastMonth);

    const fichasPorInspector = await this.prismaService.ficha.groupBy({
      by: ['IDInspector'],
      where: {
        createdAt: {
          gte: lastMonth,
        },
      },
    });

    const cantidadInspectores = fichasPorInspector.length;
    return cantidadInspectores;
  }

  private async getInactiveInspectors(): Promise<number> {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1); // Restar un mes

    const inactiveInspectors = await this.prismaService.inspector.findMany({
      where: {
        Ficha: {
          none: {
            createdAt: {
              gte: lastMonth,
            },
          },
        },
      },
    });

    return inactiveInspectors.length;
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
