/*
  Warnings:

  - Made the column `company_id` on table `jobs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `proposal_id` on table `jobs` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_company_id_fkey";

-- DropForeignKey
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_proposal_id_fkey";

-- AlterTable
ALTER TABLE "jobs" ALTER COLUMN "company_id" SET NOT NULL,
ALTER COLUMN "proposal_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_proposal_id_fkey" FOREIGN KEY ("proposal_id") REFERENCES "proposals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
