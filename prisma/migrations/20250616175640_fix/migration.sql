/*
  Warnings:

  - You are about to drop the column `userId` on the `plan_usage` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "plan_usage" DROP CONSTRAINT "plan_usage_userId_fkey";

-- AlterTable
ALTER TABLE "plan_usage" DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" TEXT;

-- AlterTable
ALTER TABLE "user_plans" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "plan_usage" ADD CONSTRAINT "plan_usage_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
