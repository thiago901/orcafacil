-- DropForeignKey
ALTER TABLE "progress_estimate_request" DROP CONSTRAINT "progress_estimate_request_proposal_id_fkey";

-- AlterTable
ALTER TABLE "progress_estimate_request" ALTER COLUMN "proposal_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "progress_estimate_request" ADD CONSTRAINT "progress_estimate_request_proposal_id_fkey" FOREIGN KEY ("proposal_id") REFERENCES "proposals"("id") ON DELETE SET NULL ON UPDATE CASCADE;
