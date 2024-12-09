-- CreateTable
CREATE TABLE "Insumo" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "certificacion" TEXT DEFAULT 'Organico',

    CONSTRAINT "Insumo_pkey" PRIMARY KEY ("id")
);
