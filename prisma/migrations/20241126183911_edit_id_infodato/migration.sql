/*
  Warnings:

  - The primary key for the `informacionDatos` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "informacionDatos" DROP CONSTRAINT "informacionDatos_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "informacionDatos_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "informacionDatos_id_seq";
