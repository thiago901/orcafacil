/*
  Warnings:

  - You are about to drop the column `files_id` on the `estimate_request_files` table. All the data in the column will be lost.
  - You are about to drop the column `reason` on the `estimate_request_files` table. All the data in the column will be lost.
  - Added the required column `url` to the `estimate_request_files` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "estimate_request_files" DROP CONSTRAINT "estimate_request_files_files_id_fkey";

-- AlterTable
ALTER TABLE "estimate_request_files" DROP COLUMN "files_id",
DROP COLUMN "reason",
ADD COLUMN     "url" TEXT NOT NULL;
