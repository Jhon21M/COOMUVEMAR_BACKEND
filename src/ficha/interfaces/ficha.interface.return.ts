export interface FichaInterfaceReturn {
  id?: number;
  nombre: string;
  fecha: Date;
  email: string;
  urlmagen: string;
  finca: string;
  productor: string;
  location: {
    latitud: string;
    longitud: string;
  };
  analizada: boolean;
}
