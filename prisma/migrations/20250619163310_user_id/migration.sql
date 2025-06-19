/*
  Warnings:

  - Made the column `user_id` on table `estimate_request` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "estimate_request" DROP CONSTRAINT "estimate_request_user_id_fkey";

-- AlterTable
ALTER TABLE "estimate_request" ALTER COLUMN "user_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "estimate_request" ADD CONSTRAINT "estimate_request_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
