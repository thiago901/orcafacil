/*
  Warnings:

  - You are about to drop the column `aproved_at` on the `proposals` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "proposals" DROP COLUMN "aproved_at",
ADD COLUMN     "approved_at" TIMESTAMP(3);
