-- CreateEnum
CREATE TYPE "ProgressEstimateRequestType" AS ENUM ('CREATED', 'PROPOSALS_RECEIVED', 'PROPOSALS_ACCEPTED', 'VISIT_REQUESTED', 'VISIT_CONFIRMED', 'VISIT_SUGGESTED', 'VISIT_COMPLETED', 'PAYMENT_REQUESTED', 'PAYMENT_COMPLETED', 'WAITING', 'FINISHED');

-- CreateTable
CREATE TABLE "progress_estimate_request" (
    "id" TEXT NOT NULL,
    "estimate_request_id" TEXT NOT NULL,
    "type" "ProgressEstimateRequestType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "progress_estimate_request_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "progress_estimate_request" ADD CONSTRAINT "progress_estimate_request_estimate_request_id_fkey" FOREIGN KEY ("estimate_request_id") REFERENCES "estimate_request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
