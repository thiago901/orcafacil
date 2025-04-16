/*
  Warnings:

  - Made the column `amount` on table `proposals` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `proposals` required. This step will fail if there are existing NULL values in that column.
  - Made the column `estimate_request_id` on table `proposals` required. This step will fail if there are existing NULL values in that column.
  - Made the column `company_id` on table `proposals` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `proposals` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "proposals" DROP CONSTRAINT "proposals_company_id_fkey";

-- DropForeignKey
ALTER TABLE "proposals" DROP CONSTRAINT "proposals_estimate_request_id_fkey";

-- AlterTable
ALTER TABLE "proposals" ALTER COLUMN "amount" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "estimate_request_id" SET NOT NULL,
ALTER COLUMN "company_id" SET NOT NULL,
ALTER COLUMN "created_at" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_estimate_request_id_fkey" FOREIGN KEY ("estimate_request_id") REFERENCES "estimate_request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
