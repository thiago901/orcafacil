/*
  Warnings:

  - Added the required column `read` to the `notifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "read",
ADD COLUMN     "read" BOOLEAN NOT NULL;
