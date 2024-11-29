-- CreateTable
CREATE TABLE "NoConformidad" (
    "id" SERIAL NOT NULL,
    "cantidadNoConformidad" INTEGER NOT NULL,
    "descripcion" TEXT,
    "IDSeccionFicha" INTEGER NOT NULL,
    "IDFicha" TEXT NOT NULL,

    CONSTRAINT "NoConformidad_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NoConformidad_IDFicha_key" ON "NoConformidad"("IDFicha");

-- AddForeignKey
ALTER TABLE "NoConformidad" ADD CONSTRAINT "NoConformidad_IDSeccionFicha_fkey" FOREIGN KEY ("IDSeccionFicha") REFERENCES "SeccionesFichas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoConformidad" ADD CONSTRAINT "NoConformidad_IDFicha_fkey" FOREIGN KEY ("IDFicha") REFERENCES "fichas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
