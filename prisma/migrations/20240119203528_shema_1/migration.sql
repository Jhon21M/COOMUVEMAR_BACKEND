-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "productores" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "numeroCedula" VARCHAR(25),
    "numeroTelefono" TEXT,
    "fechaIngresoPrograma" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" INTEGER NOT NULL,

    CONSTRAINT "productores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fincas" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "comunidad" TEXT NOT NULL,
    "areaCacaoProduccion" TEXT,
    "areaCacaoDesarrollo" TEXT,
    "produccionUltimoSiclo" INTEGER NOT NULL,
    "IDProductor" INTEGER,

    CONSTRAINT "fincas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inspectores" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "numeroTelefono" INTEGER,
    "email" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "inspectores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fichas" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "localizacion" TEXT NOT NULL,
    "IDInspector" INTEGER NOT NULL,

    CONSTRAINT "fichas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Documento" (
    "id" SERIAL NOT NULL,
    "declaracion" TEXT NOT NULL,
    "DOCDictamenFinal" TEXT NOT NULL,
    "IDFicha" INTEGER NOT NULL,

    CONSTRAINT "Documento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Desicion" (
    "id" SERIAL NOT NULL,
    "dictamen" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "IDDocumento" INTEGER NOT NULL,

    CONSTRAINT "Desicion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeccionesFicha" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "SeccionesFicha_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seccion" (
    "id" SERIAL NOT NULL,
    "IDSeccionesFicha" INTEGER NOT NULL,

    CONSTRAINT "Seccion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dato" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "IDSeccionesFicha" INTEGER NOT NULL,

    CONSTRAINT "Dato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InformacionDato" (
    "id" SERIAL NOT NULL,
    "informacion" TEXT NOT NULL,
    "descripcion" TEXT,
    "IDDato" INTEGER NOT NULL,

    CONSTRAINT "InformacionDato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "hash" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "fincas_IDProductor_key" ON "fincas"("IDProductor");

-- CreateIndex
CREATE UNIQUE INDEX "inspectores_email_key" ON "inspectores"("email");

-- CreateIndex
CREATE UNIQUE INDEX "fichas_IDInspector_key" ON "fichas"("IDInspector");

-- CreateIndex
CREATE UNIQUE INDEX "Documento_IDFicha_key" ON "Documento"("IDFicha");

-- CreateIndex
CREATE UNIQUE INDEX "Desicion_IDDocumento_key" ON "Desicion"("IDDocumento");

-- CreateIndex
CREATE UNIQUE INDEX "Seccion_IDSeccionesFicha_key" ON "Seccion"("IDSeccionesFicha");

-- CreateIndex
CREATE UNIQUE INDEX "Dato_IDSeccionesFicha_key" ON "Dato"("IDSeccionesFicha");

-- CreateIndex
CREATE UNIQUE INDEX "InformacionDato_IDDato_key" ON "InformacionDato"("IDDato");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "fincas" ADD CONSTRAINT "fincas_IDProductor_fkey" FOREIGN KEY ("IDProductor") REFERENCES "productores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fichas" ADD CONSTRAINT "fichas_IDInspector_fkey" FOREIGN KEY ("IDInspector") REFERENCES "inspectores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documento" ADD CONSTRAINT "Documento_IDFicha_fkey" FOREIGN KEY ("IDFicha") REFERENCES "fichas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Desicion" ADD CONSTRAINT "Desicion_IDDocumento_fkey" FOREIGN KEY ("IDDocumento") REFERENCES "Documento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seccion" ADD CONSTRAINT "Seccion_IDSeccionesFicha_fkey" FOREIGN KEY ("IDSeccionesFicha") REFERENCES "SeccionesFicha"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dato" ADD CONSTRAINT "Dato_IDSeccionesFicha_fkey" FOREIGN KEY ("IDSeccionesFicha") REFERENCES "Seccion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InformacionDato" ADD CONSTRAINT "InformacionDato_IDDato_fkey" FOREIGN KEY ("IDDato") REFERENCES "Dato"("id") ON DELETE CASCADE ON UPDATE CASCADE;
