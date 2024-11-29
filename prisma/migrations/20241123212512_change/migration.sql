/*
  Warnings:

  - The primary key for the `ficha` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "desicion" DROP CONSTRAINT "desicion_IDFicha_fkey";

-- DropForeignKey
ALTER TABLE "documento" DROP CONSTRAINT "documento_IDFicha_fkey";

-- DropForeignKey
ALTER TABLE "informacionDato" DROP CONSTRAINT "informacionDato_IDFicha_fkey";

-- AlterTable
ALTER TABLE "desicion" ALTER COLUMN "IDFicha" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "documento" ALTER COLUMN "IDFicha" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ficha" DROP CONSTRAINT "ficha_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ficha_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ficha_id_seq";

-- AlterTable
ALTER TABLE "informacionDato" ALTER COLUMN "IDFicha" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "desicion" ADD CONSTRAINT "desicion_IDFicha_fkey" FOREIGN KEY ("IDFicha") REFERENCES "ficha"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documento" ADD CONSTRAINT "documento_IDFicha_fkey" FOREIGN KEY ("IDFicha") REFERENCES "ficha"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "informacionDato" ADD CONSTRAINT "informacionDato_IDFicha_fkey" FOREIGN KEY ("IDFicha") REFERENCES "ficha"("id") ON DELETE CASCADE ON UPDATE CASCADE;
