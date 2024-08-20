import { JsonValue } from "@prisma/client/runtime/library";

export interface FichaInterfaceReturn {
  id?: string;
  nombre: string;
  fecha: Date;
  email: string;
  urlmagen: string;
  finca: string;
  productor: string;
  localizacion: JsonValue
  analizada: boolean;
}
