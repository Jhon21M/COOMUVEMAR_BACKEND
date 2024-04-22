-- CreateTable
CREATE TABLE "InspectorProductor" (
    "id" SERIAL NOT NULL,
    "IDProductor" INTEGER NOT NULL,
    "IDTrabajador" INTEGER NOT NULL,
    "estado" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InspectorProductor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InspectorProductor" ADD CONSTRAINT "InspectorProductor_IDProductor_fkey" FOREIGN KEY ("IDProductor") REFERENCES "productores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InspectorProductor" ADD CONSTRAINT "InspectorProductor_IDTrabajador_fkey" FOREIGN KEY ("IDTrabajador") REFERENCES "trabajadores"("id") ON DELETE CASCADE ON UPDATE CASCADE;
