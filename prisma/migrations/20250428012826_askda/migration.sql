/*
  Warnings:

  - You are about to alter the column `ratting` on the `company` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "company" ALTER COLUMN "ratting" SET DATA TYPE DOUBLE PRECISION;
