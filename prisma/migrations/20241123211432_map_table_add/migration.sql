-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "desicion" (
    "id" SERIAL NOT NULL,
    "desicion" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "IDFicha" INTEGER NOT NULL,

    CONSTRAINT "desicion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documento" (
    "id" SERIAL NOT NULL,
    "declaracion" TEXT,
    "ImgCedula" TEXT,
    "IDFicha" INTEGER NOT NULL,

    CONSTRAINT "documento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inspectorProductor" (
    "id" SERIAL NOT NULL,
    "IDProductor" INTEGER NOT NULL,
    "IDTrabajador" INTEGER NOT NULL,
    "estadoInspeccion" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inspectorProductor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seccionesFicha" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "seccionesFicha_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dato" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "IDSeccionesFicha" INTEGER NOT NULL,

    CONSTRAINT "dato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ficha" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "localizacion" JSONB NOT NULL,
    "analizada" BOOLEAN NOT NULL,
    "IDTrabajador" INTEGER NOT NULL,
    "IDFinca" INTEGER NOT NULL,

    CONSTRAINT "ficha_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "finca" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "comunidad" TEXT NOT NULL,
    "areaCacaoProduccion" TEXT,
    "areaCacaoDesarrollo" TEXT,
    "produccionUltimoSiclo" TEXT,
    "estimadoCosecha" TEXT,
    "IDProductor" INTEGER NOT NULL,

    CONSTRAINT "finca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "informacionDato" (
    "id" SERIAL NOT NULL,
    "informacion" TEXT NOT NULL,
    "descripcion" TEXT,
    "IDDato" INTEGER NOT NULL,
    "IDFicha" INTEGER NOT NULL,

    CONSTRAINT "informacionDato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productor" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "numeroCedula" VARCHAR(30),
    "numeroTelefono" TEXT,
    "fechaIngresoPrograma" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" TEXT NOT NULL,

    CONSTRAINT "productor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trabajador" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "numeroTelefono" TEXT NOT NULL,
    "urlImg" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trabajador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "IDTrabajador" INTEGER NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "desicion_IDFicha_key" ON "desicion"("IDFicha");

-- CreateIndex
CREATE UNIQUE INDEX "documento_IDFicha_key" ON "documento"("IDFicha");

-- CreateIndex
CREATE UNIQUE INDEX "informacionDato_IDFicha_key" ON "informacionDato"("IDFicha");

-- CreateIndex
CREATE UNIQUE INDEX "trabajador_urlImg_key" ON "trabajador"("urlImg");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- AddForeignKey
ALTER TABLE "desicion" ADD CONSTRAINT "desicion_IDFicha_fkey" FOREIGN KEY ("IDFicha") REFERENCES "ficha"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documento" ADD CONSTRAINT "documento_IDFicha_fkey" FOREIGN KEY ("IDFicha") REFERENCES "ficha"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspectorProductor" ADD CONSTRAINT "inspectorProductor_IDProductor_fkey" FOREIGN KEY ("IDProductor") REFERENCES "productor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspectorProductor" ADD CONSTRAINT "inspectorProductor_IDTrabajador_fkey" FOREIGN KEY ("IDTrabajador") REFERENCES "trabajador"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dato" ADD CONSTRAINT "dato_IDSeccionesFicha_fkey" FOREIGN KEY ("IDSeccionesFicha") REFERENCES "seccionesFicha"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ficha" ADD CONSTRAINT "ficha_IDFinca_fkey" FOREIGN KEY ("IDFinca") REFERENCES "finca"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ficha" ADD CONSTRAINT "ficha_IDTrabajador_fkey" FOREIGN KEY ("IDTrabajador") REFERENCES "trabajador"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "finca" ADD CONSTRAINT "finca_IDProductor_fkey" FOREIGN KEY ("IDProductor") REFERENCES "productor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "informacionDato" ADD CONSTRAINT "informacionDato_IDDato_fkey" FOREIGN KEY ("IDDato") REFERENCES "dato"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "informacionDato" ADD CONSTRAINT "informacionDato_IDFicha_fkey" FOREIGN KEY ("IDFicha") REFERENCES "ficha"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_IDTrabajador_fkey" FOREIGN KEY ("IDTrabajador") REFERENCES "trabajador"("id") ON DELETE CASCADE ON UPDATE CASCADE;
