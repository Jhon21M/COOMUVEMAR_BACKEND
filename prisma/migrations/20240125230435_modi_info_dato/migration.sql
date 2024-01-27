/*
  Warnings:

  - Added the required column `IDFicha` to the `InformacionDato` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InformacionDato" ADD COLUMN     "IDFicha" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "InformacionDato" ADD CONSTRAINT "InformacionDato_IDFicha_fkey" FOREIGN KEY ("IDFicha") REFERENCES "fichas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
