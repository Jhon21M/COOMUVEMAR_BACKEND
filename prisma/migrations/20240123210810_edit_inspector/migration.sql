/*
  Warnings:

  - Made the column `numeroTelefono` on table `inspectores` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "inspectores" ALTER COLUMN "numeroTelefono" SET NOT NULL,
ALTER COLUMN "numeroTelefono" SET DATA TYPE TEXT;
