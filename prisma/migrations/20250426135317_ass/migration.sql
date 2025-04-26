/*
  Warnings:

  - Added the required column `created_at` to the `estimate_request_files` table without a default value. This is not possible if the table is not empty.
  - Made the column `created_at` on table `files` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "estimate_request_files" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "files" ALTER COLUMN "created_at" SET NOT NULL;
