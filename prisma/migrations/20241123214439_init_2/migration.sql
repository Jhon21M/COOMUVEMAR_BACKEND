/*
  Warnings:

  - You are about to drop the `dato` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `desicion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `documento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ficha` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `finca` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `informacionDato` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `inspectorProductor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `productor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `seccionesFicha` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `trabajador` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "dato" DROP CONSTRAINT "dato_IDSeccionesFicha_fkey";

-- DropForeignKey
ALTER TABLE "desicion" DROP CONSTRAINT "desicion_IDFicha_fkey";

-- DropForeignKey
ALTER TABLE "documento" DROP CONSTRAINT "documento_IDFicha_fkey";

-- DropForeignKey
ALTER TABLE "ficha" DROP CONSTRAINT "ficha_IDFinca_fkey";

-- DropForeignKey
ALTER TABLE "ficha" DROP CONSTRAINT "ficha_IDTrabajador_fkey";

-- DropForeignKey
ALTER TABLE "finca" DROP CONSTRAINT "finca_IDProductor_fkey";

-- DropForeignKey
ALTER TABLE "informacionDato" DROP CONSTRAINT "informacionDato_IDDato_fkey";

-- DropForeignKey
ALTER TABLE "informacionDato" DROP CONSTRAINT "informacionDato_IDFicha_fkey";

-- DropForeignKey
ALTER TABLE "inspectorProductor" DROP CONSTRAINT "inspectorProductor_IDProductor_fkey";

-- DropForeignKey
ALTER TABLE "inspectorProductor" DROP CONSTRAINT "inspectorProductor_IDTrabajador_fkey";

-- DropForeignKey
ALTER TABLE "usuario" DROP CONSTRAINT "usuario_IDTrabajador_fkey";

-- DropTable
DROP TABLE "dato";

-- DropTable
DROP TABLE "desicion";

-- DropTable
DROP TABLE "documento";

-- DropTable
DROP TABLE "ficha";

-- DropTable
DROP TABLE "finca";

-- DropTable
DROP TABLE "informacionDato";

-- DropTable
DROP TABLE "inspectorProductor";

-- DropTable
DROP TABLE "productor";

-- DropTable
DROP TABLE "seccionesFicha";

-- DropTable
DROP TABLE "trabajador";

-- DropTable
DROP TABLE "usuario";

-- CreateTable
CREATE TABLE "productores" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "numeroCedula" VARCHAR(30),
    "numeroTelefono" TEXT,
    "fechaIngresoPrograma" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" INTEGER NOT NULL,

    CONSTRAINT "productores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InspectorProductor" (
    "id" SERIAL NOT NULL,
    "IDProductor" INTEGER NOT NULL,
    "IDTrabajador" INTEGER NOT NULL,
    "estadoInspeccion" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InspectorProductor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fincas" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "comunidad" TEXT NOT NULL,
    "areaCacaoProduccion" TEXT,
    "areaCacaoDesarrollo" TEXT,
    "produccionUltimoSiclo" TEXT,
    "estimadoCosecha" TEXT,
    "IDProductor" INTEGER NOT NULL,

    CONSTRAINT "fincas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trabajadores" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "numeroTelefono" TEXT NOT NULL,
    "urlImg" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trabajadores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fichas" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "localizacion" JSONB NOT NULL,
    "analizada" BOOLEAN NOT NULL,
    "IDTrabajador" INTEGER NOT NULL,
    "IDFinca" INTEGER NOT NULL,

    CONSTRAINT "fichas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Documento" (
    "id" SERIAL NOT NULL,
    "declaracion" TEXT,
    "ImgCedula" TEXT,
    "IDFicha" TEXT NOT NULL,

    CONSTRAINT "Documento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Desicion" (
    "id" SERIAL NOT NULL,
    "desicion" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "IDFicha" TEXT NOT NULL,

    CONSTRAINT "Desicion_pkey" PRIMARY KEY ("id")
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
    "IDFicha" TEXT NOT NULL,

    CONSTRAINT "informacionDatos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "IDTrabajador" INTEGER NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "trabajadores_urlImg_key" ON "trabajadores"("urlImg");

-- CreateIndex
CREATE UNIQUE INDEX "Documento_IDFicha_key" ON "Documento"("IDFicha");

-- CreateIndex
CREATE UNIQUE INDEX "Desicion_IDFicha_key" ON "Desicion"("IDFicha");

-- CreateIndex
CREATE UNIQUE INDEX "informacionDatos_IDFicha_key" ON "informacionDatos"("IDFicha");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "InspectorProductor" ADD CONSTRAINT "InspectorProductor_IDProductor_fkey" FOREIGN KEY ("IDProductor") REFERENCES "productores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InspectorProductor" ADD CONSTRAINT "InspectorProductor_IDTrabajador_fkey" FOREIGN KEY ("IDTrabajador") REFERENCES "trabajadores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fincas" ADD CONSTRAINT "fincas_IDProductor_fkey" FOREIGN KEY ("IDProductor") REFERENCES "productores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fichas" ADD CONSTRAINT "fichas_IDTrabajador_fkey" FOREIGN KEY ("IDTrabajador") REFERENCES "trabajadores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fichas" ADD CONSTRAINT "fichas_IDFinca_fkey" FOREIGN KEY ("IDFinca") REFERENCES "fincas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documento" ADD CONSTRAINT "Documento_IDFicha_fkey" FOREIGN KEY ("IDFicha") REFERENCES "fichas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Desicion" ADD CONSTRAINT "Desicion_IDFicha_fkey" FOREIGN KEY ("IDFicha") REFERENCES "fichas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "datos" ADD CONSTRAINT "datos_IDSeccionesFicha_fkey" FOREIGN KEY ("IDSeccionesFicha") REFERENCES "SeccionesFichas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "informacionDatos" ADD CONSTRAINT "informacionDatos_IDDato_fkey" FOREIGN KEY ("IDDato") REFERENCES "datos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "informacionDatos" ADD CONSTRAINT "informacionDatos_IDFicha_fkey" FOREIGN KEY ("IDFicha") REFERENCES "fichas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_IDTrabajador_fkey" FOREIGN KEY ("IDTrabajador") REFERENCES "trabajadores"("id") ON DELETE CASCADE ON UPDATE CASCADE;
