/*
  Warnings:

  - You are about to drop the column `fecha` on the `fichas` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `fichas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "fichas" DROP COLUMN "fecha",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
