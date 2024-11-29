-- AlterTable
ALTER TABLE "informacionDatos" ALTER COLUMN "informacion" DROP NOT NULL;

-- AlterTable
ALTER TABLE "productores" ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
