/*
  Warnings:

  - You are about to drop the column `limitations` on the `plans` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "plans" DROP COLUMN "limitations",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 0;
