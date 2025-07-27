-- AlterEnum
ALTER TYPE "ProgressEstimateRequestType" ADD VALUE 'VISIT_CREATED';

-- AlterTable
ALTER TABLE "scheduled_visits" ALTER COLUMN "proposal_id" DROP DEFAULT;
