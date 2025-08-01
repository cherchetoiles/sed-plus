-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('patient', 'pro', 'proche');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "role" "public"."Role" NOT NULL DEFAULT 'patient',
    "name" TEXT,
    "googleId" TEXT,
    "proSanteId" TEXT,
    "doctolibLogin" TEXT,
    "doctolibPass" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "linkedPatientId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "public"."User"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "User_proSanteId_key" ON "public"."User"("proSanteId");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_linkedPatientId_fkey" FOREIGN KEY ("linkedPatientId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
