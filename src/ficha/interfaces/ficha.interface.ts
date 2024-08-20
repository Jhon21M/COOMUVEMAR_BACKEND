import { JsonValue } from '@prisma/client/runtime/library';
import { UUID } from 'crypto';

export interface FichaInterface {
  id: UUID | string 
  createdAt?: Date | null;
  localizacion: JsonValue;
  analizada: boolean;
  IDTrabajador: number;
  IDFinca: number;
}
