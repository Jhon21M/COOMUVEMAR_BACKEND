/*
  Warnings:

  - You are about to drop the column `IDSeccionFicha` on the `NoConformidad` table. All the data in the column will be lost.
  - You are about to drop the `Insumo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `IDDato` to the `NoConformidad` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "NoConformidad" DROP CONSTRAINT "NoConformidad_IDSeccionFicha_fkey";

-- AlterTable
ALTER TABLE "NoConformidad" DROP COLUMN "IDSeccionFicha",
ADD COLUMN     "IDDato" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Insumo";

-- CreateTable
CREATE TABLE "ProductosUtilizados" (
    "id" SERIAL NOT NULL,
    "producto_aplicado" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "descripcion" TEXT,
    "permitido" BOOLEAN NOT NULL DEFAULT true,
    "certificacion" TEXT DEFAULT 'Organico',

    CONSTRAINT "ProductosUtilizados_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NoConformidad" ADD CONSTRAINT "NoConformidad_IDDato_fkey" FOREIGN KEY ("IDDato") REFERENCES "datos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
