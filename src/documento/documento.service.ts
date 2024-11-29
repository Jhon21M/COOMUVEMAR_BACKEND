import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EntityDocumento, EntityUpdateDocumento } from './entities';
import { saveImg } from 'src/auth/util';
import { InstanceLinksHost } from '@nestjs/core/injector/instance-links-host';
import { ProductorController } from 'src/productor/productor.controller';

@Injectable()
export class DocumentoService {
  constructor(private prisma: PrismaService) {}

  async create(dato: EntityDocumento): Promise<EntityDocumento> {
    console.log('estamos en el servicio de documento');
    try {
      const { ImgCedula, IDFicha } = dato;
      const fichaproducto = await this.prisma.ficha.findUnique({
        where: {
          id: IDFicha,
        },
        include: {
          finca: {
            select: {
              nombre: true,
              comunidad: true,
              productor: {
                select: {
                  nombre: true,
                  apellido: true,
                },
              },
            },
          },
        },
      });

      const productor_nombre =
        fichaproducto.finca.productor.nombre +
        fichaproducto.finca.productor.apellido;

      const finca_nombre =
        fichaproducto.finca.nombre + fichaproducto.finca.comunidad;

      const url = await saveImg(ImgCedula, finca_nombre, productor_nombre);

      const newdocumento = await this.prisma.documento.create({
        data: {
          id: dato.id,
          declaracion: dato.declaracion,
          ImgCedula: url.filePath,
          ficha: {
            connect: {
              id: dato.IDFicha,
            },
          },
        },
      });

      console.log('imprimiendo documento creado', newdocumento);

      return newdocumento;
    } catch (error) {
      console.error('ah! algo salio mal:', error);
      throw new Error('ah! algo salio mal!');
    }
  }

  async findAll() {
    return await this.prisma.documento.findMany();
  }

  findOne(id: string) {
    return this.prisma.documento.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(
    id: string,
    documento: EntityUpdateDocumento,
  ): Promise<EntityUpdateDocumento> {
    return await this.prisma.documento.update({
      where: {
        id: id,
      },
      data: {
        ...documento,
      },
    });
  }

  remove(id: string) {
    return this.prisma.documento.delete({
      where: {
        id: id,
      },
      select: {
        id: true,
      },
    });
  }
}
