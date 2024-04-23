import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { GcsConfig } from './cloud_storage';
import { unlinkSync } from 'fs';

@Injectable()
export class GoogleService {
  private readonly storage: Storage;

  constructor() {
    const GCP_PROJECT_ID = GcsConfig.project_id; //'plated-will-415517';
    const GCP_KEY_FILE_PATH = 'gsc-cloud.json';

    this.storage = new Storage({
      projectId: GCP_PROJECT_ID,
      keyFilename: GCP_KEY_FILE_PATH,
    });
  }
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
      expires: expirationDate, // La URL expirará en 100 años
    });

    // Elimina la imagen guardada en el servidor después de subirla al almacenamiento en la nube
    unlinkSync(filePath);

    console.log('URL:', url);
    return url;

    return `https://storage.cloud.google.com/${GCP_BUCKET}/${fileName}`;
  }

  async obtenerTipoImagen(base64String: string): Promise<string> {
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
