import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EntityInspector } from './entities';
import { PrismaService } from 'src/prisma/prisma.service';
import { EntityUpdateInspector } from './entities/update.productor.entity';
import { MemoryStoredFile } from 'nestjs-form-data';
import { writeFileSync, unlinkSync } from 'fs';
import { GoogleService } from 'src/common/google_cloud/upload-google.service';
import { CreateTrabajadorProductorDto } from './dto';
import { InspectorProductor, Usuario } from '@prisma/client';
import { EntityProductor } from 'src/productor/entities';
import { forbidden } from 'joi';
import { triggerAsyncId } from 'async_hooks';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class InspectorService {
  constructor(
    private prisma: PrismaService,
    private readonly google: GoogleService,
  ) {}

  async create(inspector: EntityInspector): Promise<any> {
    const { urlImg } = inspector;

    if (urlImg) {
      console.log(inspector);
      // Llamada a la función para obtener el tipo de imagen

      const tipoImagen = await this.google.obtenerTipoImagen(urlImg);

      const base64Data = inspector.urlImg.replace(
        /^data:image\/\w+;base64,/,
        '',
      );
      // Convertir la cadena base64 a un buffer
      const buffer = Buffer.from(base64Data, 'base64');
      console.log('imprimiendo buffer luego de convertir', buffer);

      // Guarda la imagen en el servidor
      const nombre = inspector.nombre + inspector.apellido;
      const filePath = `src/common/file/perfil-foto/${nombre}.${tipoImagen}`;
      writeFileSync(filePath, buffer);

      const photoUrl = await this.google.uploadFile(filePath);
      console.log('6');

      return this.prisma.trabajador.create({
        data: {
          nombre: inspector.nombre,
          apellido: inspector.apellido,
          numeroTelefono: inspector.numeroTelefono,
          urlImg: photoUrl,
        },
      });
    } else {
      console.log('imprimiendo trabajador sin imagen', inspector);
      return this.prisma.trabajador.create({
        data: {
          nombre: inspector.nombre,
          apellido: inspector.apellido,
          numeroTelefono: inspector.numeroTelefono,
        },
      });
    }
  }

  async createTP(asignacion: CreateTrabajadorProductorDto) {
    const productor = await this.prisma.inspectorProductor.findFirst({
      where: {
        IDProductor: asignacion.IDProductor,
      },
    });

    if (productor) {
      throw new ConflictException(
        'El productor ya tiene un inspector asignado',
      );
    }

    return this.prisma.inspectorProductor.create({
      data: {
        IDProductor: asignacion.IDProductor,
        IDTrabajador: asignacion.IDTrabajador,
        estadoInspeccion: asignacion?.estadoInspeccion,
      },
    });
  }

  async getTPAdmin(id: number) {
    const productorinspectorData =
      await this.prisma.inspectorProductor.findMany({
        where: {
          IDTrabajador: id,
        },
        include: {
          trabajador: true,
        },
      });

    if (productorinspectorData.length === 0) {
      throw new NotFoundException('No cuenta con asignaciones aun..');
    }
    const returndata = [];

    for (const productor of productorinspectorData) {
      const productorData = await this.prisma.productor.findUnique({
        where: {
          id: productor.IDProductor,
        },
        include: {
          Finca: true,
        },
      });

      returndata.push(productorData);
    }
    return returndata;
  }

  async getAllTPAdmin() {
    const inspectorsWithProductors = {};

    // Obtener todos los registros de inspector-productor
    const inspectorProductorData =
      await this.prisma.inspectorProductor.findMany({
        include: {
          trabajador: true,
        },
      });

    // Recorrer cada registro de inspector-productor
    for (const inspectorProductor of inspectorProductorData) {
      const inspector = inspectorProductor.trabajador;

      // Obtener los datos del productor asociado a este inspector-productor
      const productorData = await this.prisma.productor.findUnique({
        where: {
          id: inspectorProductor.IDProductor,
        },
        include: {
          Finca: true,
        },
      });

      // Si el inspector aún no tiene una entrada en inspectorsWithProductors, crear una nueva entrada
      if (!inspectorsWithProductors[inspector.id]) {
        inspectorsWithProductors[inspector.id] = {
          inspector: inspector,
          productores: [],
        };
      }

      // Agregar el productor a la lista de productores del inspector
      inspectorsWithProductors[inspector.id].productores.push(productorData);
    }

    // Convertir el objeto en un array para mantener el formato deseado
    const resultArray = Object.values(inspectorsWithProductors);

    // Verificar si se encontraron datos
    if (resultArray.length === 0) {
      throw new NotFoundException(
        'No se encontraron inspectores con productores asignados.',
      );
    }

    return resultArray;
  }

  async removeProductorInsector(IDsProductor: number[]) {
    console.log('imprimiendo numeros', IDsProductor);
    const comprobacioDataFound = [];
    const comprobacioDataNotFound = [];
    for (let com of IDsProductor) {
      const data = await this.prisma.inspectorProductor.findFirst({
        where: {
          IDProductor: com,
        },
      });

      if (data) {
        comprobacioDataFound.push(data);
      } else {
        comprobacioDataNotFound.push(com);
      }
    }
    console.log('comprobacioDataFound', comprobacioDataFound);
    console.log('comprobacioDataNotFound', comprobacioDataNotFound);

    let selec = [];
    // for (let productor of comprobacioDataFound) {
    //   console.log('imprimiendo iterador', productor);
    //   const data = await this.prisma.inspectorProductor.findFirst({
    //     where: {
    //       IDProductor: productor.IDProductor,
    //     },
    //   });
    //   selec.push(data);
    // }
    //console.log('selec', selec);
    for (const data of comprobacioDataFound) {
      console.log('Impriminedo Ids', data.id);
      console.log('Impriminedo Ids', data);

      await this.prisma.inspectorProductor.delete({
        where: {
          id: data.id,
        },
      });
    }

    if (comprobacioDataNotFound.length > 0) {
      throw new NotFoundException({
        'Eliminacion completa de Productor/res': comprobacioDataFound,
        'No se encontraron Productores con Ids': comprobacioDataNotFound,
      });
    }
    throw new HttpException('Eliminacion completa', HttpStatus.OK);
  }

  async findAll() {
    return await this.prisma.trabajador.findMany();
  }

  findOne(id: number) {
    return this.prisma.trabajador.findUnique({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
    });
  }

  async update(
    id: number,
    inspector: EntityUpdateInspector,
  ): Promise<EntityUpdateInspector> {
    return await this.prisma.trabajador.update({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
      data: {
        ...inspector,
      },
    });
  }

  remove(id: number) {
    return this.prisma.trabajador.delete({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
    });
  }

  // https://storage.cloud.google.com/storage-img-j/kitten.png
  //gs://storage-img-j/kitten.png
  //file(photo.originalName).save(photo.buffer);
  // async uploadFile(buffer: Buffer, originalName: string): Promise<string> {
  //   //console.log('2');
  //   const GCP_BUCKET = 'bucket-photos-api';
  //   //console.log('3');
  //   const bucket = this.storage.bucket(GCP_BUCKET);
  //   //console.log('4');
  //   const file = await bucket.file(originalName).save(buffer);
  //   //console.log('5');
  //   //console.log('impriendo file', file);
  //   //console.log('6');
  //   return `https://storage.cloud.google.com/${GCP_BUCKET}/${originalName}`;
  // }
}
