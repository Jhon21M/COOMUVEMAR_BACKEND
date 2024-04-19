import { Injectable } from '@nestjs/common';
import { EntityInspector } from './entities';
import { PrismaService } from 'src/prisma/prisma.service';
import { EntityUpdateInspector } from './entities/update.productor.entity';
import { MemoryStoredFile } from 'nestjs-form-data';
import { writeFileSync, unlinkSync } from 'fs';
import { GoogleService } from 'src/common/google_cloud/upload-google.service';

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

      const base64Data = inspector.urlImg.replace(
        /^data:image\/\w+;base64,/,
        '',
      );

      // Llamada a la función para obtener el tipo de imagen
      const tipoImagen = this.google.obtenerTipoImagen(base64Data);
      // Convertir la cadena base64 a un buffer
      const buffer = Buffer.from(base64Data, 'base64');
      console.log('imprimiendo buffer luego de convertir', buffer);

      // Guarda la imagen en el servidor
      const nombre = inspector.nombre + inspector.apellido;
      const filePath = `src/common/perfil-foto/${nombre}.${tipoImagen}`;
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

  async createTP(ouhoubo: any) {}

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
