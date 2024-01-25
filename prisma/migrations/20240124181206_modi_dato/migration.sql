-- DropForeignKey
ALTER TABLE "Dato" DROP CONSTRAINT "Dato_IDSeccionesFicha_fkey";

-- DropForeignKey
ALTER TABLE "Seccion" DROP CONSTRAINT "Seccion_IDSeccionesFicha_fkey";

-- AlterTable
ALTER TABLE "Seccion" ADD COLUMN     "seccionesFichaId" INTEGER;

-- AddForeignKey
ALTER TABLE "Dato" ADD CONSTRAINT "Dato_IDSeccionesFicha_fkey" FOREIGN KEY ("IDSeccionesFicha") REFERENCES "SeccionesFicha"("id") ON DELETE CASCADE ON UPDATE CASCADE;
