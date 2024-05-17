/*
  Warnings:

  - Changed the type of `localizacion` on the `fichas` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
-- AlterTable
ALTER TABLE "fichas" ALTER COLUMN "localizacion" SET DATA TYPE JSONB USING "localizacion"::JSONB;


-- AlterTable
ALTER TABLE "productores" ALTER COLUMN "estado" DROP NOT NULL,
ALTER COLUMN "estado" SET DATA TYPE TEXT;
