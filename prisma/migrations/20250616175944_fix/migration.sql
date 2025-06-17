/*
  Warnings:

  - Made the column `user_id` on table `plan_usage` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "plan_usage" DROP CONSTRAINT "plan_usage_user_id_fkey";

-- AlterTable
ALTER TABLE "plan_usage" ALTER COLUMN "user_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "plan_usage" ADD CONSTRAINT "plan_usage_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
