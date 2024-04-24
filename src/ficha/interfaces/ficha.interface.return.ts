export interface FichaInterfaceReturn {
  id?: number;
  nombre: string;
  fecha: Date;
  email: string;
  urlmagen: string;
  finca: string;
  productor: string;
  localizacion: {
    latitud: string;
    longitud: string;
  };
  analizada: boolean;
}
