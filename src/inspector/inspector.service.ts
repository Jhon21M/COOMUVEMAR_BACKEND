import { Injectable } from '@nestjs/common';
import { EntityInspector } from './entities';
import { PrismaService } from 'src/prisma/prisma.service';
import { EntityUpdateInspector } from './entities/update.productor.entity';
import { Storage } from '@google-cloud/storage';
import { MemoryStoredFile } from 'nestjs-form-data';
import { writeFileSync, unlinkSync } from 'fs';

@Injectable()
export class InspectorService {
  private readonly storage: Storage;
  constructor(private prisma: PrismaService) {
    const GCP_PROJECT_ID = 'plated-will-415517';
    const GCP_KEY_FILE_PATH = 'gsc-cloud.json';

    this.storage = new Storage({
      projectId: GCP_PROJECT_ID,
      keyFilename: GCP_KEY_FILE_PATH,
    });
  }

  async create(inspector: EntityInspector): Promise<any> {
    const { urlImg } = inspector;

    if (urlImg) {
      console.log(inspector);

      const base64Data = inspector.urlImg.replace(
        /^data:image\/\w+;base64,/,
        '',
      );

      // Llamada a la función para obtener el tipo de imagen
      const tipoImagen = this.obtenerTipoImagen(base64Data);
      // Convertir la cadena base64 a un buffer
      const buffer = Buffer.from(base64Data, 'base64');
      console.log('imprimiendo buffer luego de convertir', buffer);

      // Guarda la imagen en el servidor
      const nombre = inspector.nombre + inspector.apellido;
      const filePath = `src/inspector/image64/perfil-trabajador/${nombre}.${tipoImagen}`;
      writeFileSync(filePath, buffer);

      const photoUrl = await this.uploadFile(filePath);
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

  async uploadFile(filePath: string): Promise<string> {
    const GCP_BUCKET = 'bucket-photos-api';

    const bucket = this.storage.bucket(GCP_BUCKET);
    const fileName = filePath.split('/').pop(); // Obtén el nombre del archivo desde la ruta del archivo

    await bucket.upload(filePath, {
      destination: fileName,
    });

    const expirationDate = new Date('2100-01-01');

    // Obtiene la URL firmada con acceso temporal al archivo cargado
    const [url] = await bucket.file(fileName).getSignedUrl({
      action: 'read',
      expires: expirationDate, // La URL expirará en 15 minutos
    });

    // Elimina la imagen guardada en el servidor después de subirla al almacenamiento en la nube
    unlinkSync(filePath);

    console.log('URL:', url);
    return url;

    return `https://storage.cloud.google.com/${GCP_BUCKET}/${fileName}`;
  }

  obtenerTipoImagen(base64String: string): string | null {
    const tipo_imagen = base64String.substring(5, base64String.indexOf(';'));

    let finaltype = '';
    console.log('imprimiendo tipo de imagen', tipo_imagen);

    if (tipo_imagen === 'image/jpeg') {
      finaltype = 'jpeg';
    } else if (tipo_imagen === 'image/jpg') {
      finaltype = 'jpg';
    } else if (tipo_imagen === 'image/png') {
      finaltype = 'png';
    }

    return finaltype;
  }
}
