/*
  Warnings:

  - You are about to drop the column `IDInspector` on the `fichas` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the `Dato` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InformacionDato` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SeccionesFicha` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `inspectores` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `huella` to the `Documento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `IDFinca` to the `fichas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `IDTrabajador` to the `fichas` table without a default value. This is not possible if the table is not empty.
  - Made the column `IDProductor` on table `fincas` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `IDTrabajador` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Dato" DROP CONSTRAINT "Dato_IDSeccionesFicha_fkey";

-- DropForeignKey
ALTER TABLE "InformacionDato" DROP CONSTRAINT "InformacionDato_IDDato_fkey";

-- DropForeignKey
ALTER TABLE "InformacionDato" DROP CONSTRAINT "InformacionDato_IDFicha_fkey";

-- DropForeignKey
ALTER TABLE "fichas" DROP CONSTRAINT "fichas_IDInspector_fkey";

-- AlterTable
ALTER TABLE "Documento" ADD COLUMN     "huella" BYTEA NOT NULL;

-- AlterTable
ALTER TABLE "fichas" DROP COLUMN "IDInspector",
ADD COLUMN     "IDFinca" INTEGER NOT NULL,
ADD COLUMN     "IDTrabajador" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "fincas" ALTER COLUMN "IDProductor" SET NOT NULL;

-- AlterTable
ALTER TABLE "productores" ALTER COLUMN "numeroCedula" SET DATA TYPE VARCHAR(30);

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "IDTrabajador" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Dato";

-- DropTable
DROP TABLE "InformacionDato";

-- DropTable
DROP TABLE "SeccionesFicha";

-- DropTable
DROP TABLE "inspectores";

-- CreateTable
CREATE TABLE "trabajadores" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "numeroTelefono" TEXT NOT NULL,
    "urlImg" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trabajadores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeccionesFichas" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "SeccionesFichas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "datos" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "IDSeccionesFicha" INTEGER NOT NULL,

    CONSTRAINT "datos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "informacionDatos" (
    "id" SERIAL NOT NULL,
    "informacion" TEXT NOT NULL,
    "descripcion" TEXT,
    "IDDato" INTEGER NOT NULL,
    "IDFicha" INTEGER NOT NULL,

    CONSTRAINT "informacionDatos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "trabajadores_urlImg_key" ON "trabajadores"("urlImg");

-- AddForeignKey
ALTER TABLE "fichas" ADD CONSTRAINT "fichas_IDTrabajador_fkey" FOREIGN KEY ("IDTrabajador") REFERENCES "trabajadores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fichas" ADD CONSTRAINT "fichas_IDFinca_fkey" FOREIGN KEY ("IDFinca") REFERENCES "fincas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "datos" ADD CONSTRAINT "datos_IDSeccionesFicha_fkey" FOREIGN KEY ("IDSeccionesFicha") REFERENCES "SeccionesFichas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "informacionDatos" ADD CONSTRAINT "informacionDatos_IDDato_fkey" FOREIGN KEY ("IDDato") REFERENCES "datos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "informacionDatos" ADD CONSTRAINT "informacionDatos_IDFicha_fkey" FOREIGN KEY ("IDFicha") REFERENCES "fichas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_IDTrabajador_fkey" FOREIGN KEY ("IDTrabajador") REFERENCES "trabajadores"("id") ON DELETE CASCADE ON UPDATE CASCADE;
