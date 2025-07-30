-- AlterTable
ALTER TABLE "progress_estimate_request" ADD COLUMN     "proposal_id" TEXT NOT NULL DEFAULT '464a3c68-8e2d-4e9a-a30f-70eb07fda4d8';

-- AddForeignKey
ALTER TABLE "progress_estimate_request" ADD CONSTRAINT "progress_estimate_request_proposal_id_fkey" FOREIGN KEY ("proposal_id") REFERENCES "proposals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
