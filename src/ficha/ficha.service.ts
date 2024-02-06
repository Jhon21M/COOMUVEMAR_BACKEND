import { Injectable } from '@nestjs/common';
import { EntityFicha, EntityUpdateFicha } from './entities';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FichaService {
  constructor(private prisma: PrismaService) {}

  async create(ficha: EntityFicha): Promise<EntityFicha> {
    const newFicha = await this.prisma.ficha.create({
      data: {
        ...ficha,
      },
    });

    return newFicha;
  }

  async findAll() {
    return await this.prisma.ficha.findMany();
  }

  findOne(id: number) {
    return this.prisma.ficha.findUnique({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
    });
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

      //console.log('ficha con seciones: ', fichaConSecciones);

      // Convertir el objeto a JSON con formato y orden personalizado
      // const fichaConSecciones2 = JSON.stringify(
      //   fichaConSecciones,
      //   (key, value) => {
      //     console.log('impriendo key: ', key);
      //     console.log('impriendo value: ', value);

      //     // Ordenar las propiedades según tus preferencias
      //     if (key === 'SeccionesFicha') return 1;
      //     if (key === 'Dato') return 2;
      //     if (key === 'InformacionDato') return 3;

      //     console.log('volviendo a immprimir key: ', key);

      //     return value;
      //   },
      //   2,
      // ); // 2 espacios de indentación para mejorar la legibilidad

      // console.log(fichaConSecciones2);
      // return fichaConSecciones2;
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
}
