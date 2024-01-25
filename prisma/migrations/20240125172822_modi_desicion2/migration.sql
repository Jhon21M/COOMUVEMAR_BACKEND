/*
  Warnings:

  - You are about to drop the column `dictamen` on the `Desicion` table. All the data in the column will be lost.
  - Added the required column `desicion` to the `Desicion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Desicion" DROP COLUMN "dictamen",
ADD COLUMN     "desicion" TEXT NOT NULL;
