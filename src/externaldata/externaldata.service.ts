import { Injectable } from '@nestjs/common';
import { CreateExternaldataDto } from './dto/create-externaldatum.dto';
import { UpdateExternaldatumDto } from './dto/update-externaldatum.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExternaldataService {
  constructor(private prisma: PrismaService) {}
  async create(externalData: CreateExternaldataDto): Promise<any> {
    if (externalData.finca) {
      if (externalData.finca.length > 1) {
        try {
          const newFinca = await this.prisma.finca.createMany({
            data: {
              ...externalData.finca,
            },
          });
        } catch (error) {
          console.error('Error al crear la ficha:', error.message);
          throw error; // Lanzar el error para que se maneje externamente
        }
      } else {
        try {
          const newFinca = await this.prisma.finca.create({
            data: {
              ...externalData.finca[0],
            },
          });
        } catch (error) {
          console.error('Error al crear la ficha:', error.message);
          throw error; // Lanzar el error para que se maneje externamente
        }
      }
    }

    if (externalData.ficha.length > 1) {
      try {
        const newFicha = await this.prisma.ficha.createMany({
          data: {
            ...externalData.ficha,
          },
        });
      } catch (error) {
        console.error('Error al crear la ficha:', error.message);
        throw error; // Lanzar el error para que se maneje externamente
      }
    } else {
      try {
        const newFicha = await this.prisma.ficha.create({
          data: {
            ...externalData.ficha[0],
          },
        });

        return newFicha;
      } catch (error) {
        console.error('Error al crear la ficha:', error.message);
        throw error; // Lanzar el error para que se maneje externamente
      }
    }

    if (externalData.InformacionDato.length > 1) {
      try {
        const newInfoDato = await this.prisma.informacionDato.createMany({
          data: {
            ...externalData.InformacionDato,
          },
        });
      } catch (error) {
        console.error('Error al crear la ficha:', error.message);
        throw error; // Lanzar el error para que se maneje externamente
      }
    } else {
      try {
        const newInfoDato = await this.prisma.informacionDato.create({
          data: {
            ...externalData.InformacionDato[0],
          },
        });
      } catch (error) {
        console.error('Error al crear la ficha:', error.message);
        throw error; // Lanzar el error para que se maneje externamente
      }
    }
  }

  findAll() {
    return `This action returns all externaldata`;
  }

  findOne(id: number) {
    return `This action returns a #${id} externaldatum`;
  }

  update(id: number, updateExternaldatumDto: UpdateExternaldatumDto) {
    return `This action updates a #${id} externaldatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} externaldatum`;
  }
}
