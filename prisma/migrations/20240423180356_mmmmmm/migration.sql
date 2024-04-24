/*
  Warnings:

  - You are about to drop the column `estado` on the `InspectorProductor` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `productores` table. All the data in the column will be lost.
  - Added the required column `estadoInspeccion` to the `InspectorProductor` table without a default value. This is not possible if the table is not empty.
  - Made the column `analizada` on table `fichas` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `estadoProgramaC` to the `productores` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InspectorProductor" DROP COLUMN "estado",
ADD COLUMN     "estadoInspeccion" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "fichas" ALTER COLUMN "analizada" SET NOT NULL;

-- AlterTable
ALTER TABLE "productores" DROP COLUMN "estado",
ADD COLUMN     "estadoProgramaC" TEXT NOT NULL;
