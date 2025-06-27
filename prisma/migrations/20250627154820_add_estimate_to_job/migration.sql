-- AlterTable
ALTER TABLE "jobs" ADD COLUMN     "estimate_id" TEXT NOT NULL DEFAULT '7211c8f5-673e-4dec-b043-c7d3f5cf6c76';

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_estimate_id_fkey" FOREIGN KEY ("estimate_id") REFERENCES "estimates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
