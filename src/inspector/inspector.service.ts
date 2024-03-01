import { Injectable } from '@nestjs/common';
import { EntityInspector } from './entities';
import { PrismaService } from 'src/prisma/prisma.service';
import { EntityUpdateInspector } from './entities/update.productor.entity';
import { File, Storage } from '@google-cloud/storage';
import { fileURLToPath } from 'url';
import { MemoryStoredFile } from 'nestjs-form-data';

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
    console.log('imprimiendo el inspector antes de guardar', inspector);

    if (urlImg) {
      console.log('1');
      const photoUrl = await this.uploadFile(urlImg as MemoryStoredFile);
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

  async findOneTrabajador(id: number) {
    const user = await this.prisma.usuario.findUnique({
      where: {
        id: typeof id === 'number' ? id : Number.parseInt(id),
      },
    });

    return await this.prisma.trabajador.findUnique({
      where: {
        id: user.IDTrabajador,
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
  } // https://storage.cloud.google.com/storage-img-j/kitten.png
  //gs://storage-img-j/kitten.png
  //file(photo.originalName).save(photo.buffer);
  async uploadFile(Photo: MemoryStoredFile) {
    console.log('2');
    const GCP_BUCKET = 'bucket-photos-api';
    console.log('3');
    const bucket = this.storage.bucket(GCP_BUCKET);
    console.log('4');
    const file = await bucket.file(Photo.originalName).save(Photo.buffer);
    console.log('5');
    console.log('impriendo file', file);
    console.log('6');
    return `https://storage.cloud.google.com/${GCP_BUCKET}/${Photo.originalName}`;
  }
}
