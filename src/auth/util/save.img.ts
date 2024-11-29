import { writeFileSync } from 'fs';

export const saveImg = async (
  Img: string,
  finca: string,
  productor: string,
) => {
  const tipoImagen = await obtenerTipoImagen(Img);

  const base64Data = Img.replace(/^data:image\/\w+;base64,/, '');
  // Convertir la cadena base64 a un buffer
  const buffer = Buffer.from(base64Data, 'base64');
  //console.log('imprimiendo buffer luego de convertir', buffer);

  // Guarda la imagen en el servidor
  const nombre = finca + productor;
  const filePath = `src/common/file/cedula-fichas/${nombre}.${tipoImagen}`;
  writeFileSync(filePath, buffer);

  return { filePath };
};

const obtenerTipoImagen = async (base64String: string): Promise<string> => {
  const tipo_imagen = base64String.substring(5, base64String.indexOf(';'));

  let finaltype = '';
  //console.log('imprimiendo tipo de imagen', tipo_imagen);

  if (tipo_imagen === 'image/jpeg') {
    finaltype = 'jpeg';
  } else if (tipo_imagen === 'image/jpg') {
    finaltype = 'jpg';
  } else if (tipo_imagen === 'image/png') {
    finaltype = 'png';
  }

  return finaltype;
};
