/*
  Warnings:

  - Made the column `estimate_request_id` on table `estimate_request_files` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "estimate_request_files" DROP CONSTRAINT "estimate_request_files_estimate_request_id_fkey";

-- AlterTable
ALTER TABLE "estimate_request_files" ALTER COLUMN "estimate_request_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "estimate_request_files" ADD CONSTRAINT "estimate_request_files_estimate_request_id_fkey" FOREIGN KEY ("estimate_request_id") REFERENCES "estimate_request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
