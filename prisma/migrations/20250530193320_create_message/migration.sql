-- CreateEnum
CREATE TYPE "SenderType" AS ENUM ('CLIENT', 'COMPANY');

-- AlterTable
ALTER TABLE "estimate_request" ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'Pintor';

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sender" "SenderType" NOT NULL,
    "type" TEXT NOT NULL,
    "estimate_request_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_estimate_request_id_fkey" FOREIGN KEY ("estimate_request_id") REFERENCES "estimate_request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
