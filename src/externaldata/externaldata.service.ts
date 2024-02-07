import { Injectable } from '@nestjs/common';
import { CreateExternaldataDto } from './dto/create-externaldatum.dto';
import { UpdateExternaldatumDto } from './dto/update-externaldatum.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExternaldataService {
  constructor(private prisma: PrismaService) {}
  newFinca: any;
  newFicha: any;
  newInfoDato: any;
  async create(externalData: CreateExternaldataDto): Promise<any> {
    if (externalData.ficha.length > 1) {
      try {
        this.newFicha = await this.prisma.ficha.createMany({
          data: {
            ...externalData.ficha,
          },
        });
      } catch (error) {
        console.error('Error al crear la ficha:', error.message);
        throw error;
      }
    } else {
      try {
        console.log('creando ficha:', externalData.ficha[0]);
        this.newFicha = await this.prisma.ficha.create({
          data: {
            ...externalData.ficha[0],
          },
        });
        console.log('ficha creada...');
      } catch (error) {
        console.error('Error al crear la ficha:', error.message);
        throw error;
      }
    }

    if (externalData.finca.length > 0) {
      if (externalData.finca.length > 1) {
        try {
          this.newFinca = await this.prisma.finca.createMany({
            data: {
              ...externalData.finca,
            },
          });
        } catch (error) {
          console.error('Error al crear la finca:', error.message);
          throw error;
        }
      } else {
        try {
          this.newFinca = await this.prisma.finca.create({
            data: {
              ...externalData.finca[0],
            },
          });
        } catch (error) {
          console.error('Error al crear la finca:', error.message);
          throw error;
        }
      }
    }

    if (externalData.InformacionDato.length > 1) {
      try {
        this.newInfoDato = await this.prisma.informacionDato.createMany({
          data: {
            ...externalData.InformacionDato,
          },
        });
      } catch (error) {
        console.error('Error al crear la InfoDato:', error.message);
        throw error;
      }
    } else {
      try {
        this.newInfoDato = await this.prisma.informacionDato.create({
          data: {
            ...externalData.InformacionDato[0],
          },
        });
      } catch (error) {
        console.error('Error al crear la infoDato:', error.message);
        throw error;
      }
    }

    return {
      ficha: this.newFicha,
      finca: this.newFinca,
      InformacionDato: this.newInfoDato,
    };
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
