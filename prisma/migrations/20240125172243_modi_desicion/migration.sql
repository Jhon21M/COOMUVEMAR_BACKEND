/*
  Warnings:

  - You are about to drop the column `IDDocumento` on the `Desicion` table. All the data in the column will be lost.
  - You are about to drop the `Seccion` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[IDFicha]` on the table `Desicion` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `IDFicha` to the `Desicion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Desicion" DROP CONSTRAINT "Desicion_IDDocumento_fkey";

-- DropIndex
DROP INDEX "Desicion_IDDocumento_key";

-- AlterTable
ALTER TABLE "Desicion" DROP COLUMN "IDDocumento",
ADD COLUMN     "IDFicha" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Seccion";

-- CreateIndex
CREATE UNIQUE INDEX "Desicion_IDFicha_key" ON "Desicion"("IDFicha");

-- AddForeignKey
ALTER TABLE "Desicion" ADD CONSTRAINT "Desicion_IDFicha_fkey" FOREIGN KEY ("IDFicha") REFERENCES "fichas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
