import { JsonValue } from '@prisma/client/runtime/library';

export interface FichaInterface {
  createdAt?: Date | null;
  localizacion: JsonValue;
  analizada: boolean;
  IDTrabajador: number;
  IDFinca: number;
}
