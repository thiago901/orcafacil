/*
  Warnings:

  - Added the required column `total` to the `estimates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estimate_id` to the `proposals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expire_at` to the `proposals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "estimates" ADD COLUMN     "total" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "proposals" ADD COLUMN     "estimate_id" TEXT NOT NULL,
ADD COLUMN     "expire_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION;

-- AddForeignKey
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_estimate_id_fkey" FOREIGN KEY ("estimate_id") REFERENCES "estimates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
