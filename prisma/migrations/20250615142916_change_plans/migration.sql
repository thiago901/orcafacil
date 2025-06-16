/*
  Warnings:

  - You are about to drop the column `price_id` on the `plans` table. All the data in the column will be lost.
  - You are about to drop the column `plan_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `PlanUsage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PlanUsage" DROP CONSTRAINT "PlanUsage_userId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_plan_id_fkey";

-- AlterTable
ALTER TABLE "plans" DROP COLUMN "price_id",
ADD COLUMN     "price_id_month" TEXT,
ADD COLUMN     "price_id_year" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "plan_id";

-- DropTable
DROP TABLE "PlanUsage";

-- CreateTable
CREATE TABLE "user_plans" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "plan_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "plan_type" TEXT NOT NULL DEFAULT 'monthly',
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(3),

    CONSTRAINT "user_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plan_usage" (
    "id" TEXT NOT NULL,
    "user_plan_id" TEXT NOT NULL,
    "resource" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "period" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "plan_usage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "plan_usage_user_plan_id_resource_period_key" ON "plan_usage"("user_plan_id", "resource", "period");

-- AddForeignKey
ALTER TABLE "user_plans" ADD CONSTRAINT "user_plans_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_plans" ADD CONSTRAINT "user_plans_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan_usage" ADD CONSTRAINT "plan_usage_user_plan_id_fkey" FOREIGN KEY ("user_plan_id") REFERENCES "user_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan_usage" ADD CONSTRAINT "plan_usage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
