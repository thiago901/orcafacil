/*
  Warnings:

  - You are about to drop the column `price` on the `plans` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "plans" DROP COLUMN "price",
ADD COLUMN     "price_month" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "price_year" DOUBLE PRECISION NOT NULL DEFAULT 0;
